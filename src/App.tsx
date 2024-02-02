import { Fragment, useEffect, useMemo, useState } from "react";
import { ISocketData } from "./interfaces/ISocketData";
import EffectControls from "./components/effect";

function App() {
  const [socketData, setSocketData] = useState<ISocketData | null>(null);

  useEffect(() => {
    let websocket: WebSocket | null = null;

    const connectWebSocket = () => {
      websocket = new WebSocket("ws://localhost:8765");

      websocket.onopen = () => {
        console.log("WebSocket Connected");
      };

      websocket.onmessage = (event) => {
        // Предполагается, что сервер отправляет значения громкости в диапазоне от 0 до 1
        setSocketData(JSON.parse(event.data));
      };

      websocket.onclose = (e) => {
        console.log(
          "WebSocket Disconnected. Attempting to reconnect...",
          e.reason
        );
        setTimeout(connectWebSocket, 1000); // Попытка переподключения через 1 секунду
      };

      websocket.onerror = (err) => {
        console.error("WebSocket encountered error: ", err, "Closing socket");
        websocket?.close();
      };
    };

    connectWebSocket();

    return () => {
      websocket?.close();
    };
  }, []);

  const inputProgressBarValue = useMemo(() => {
    return parseFloat(socketData?.input_rms ?? "") * 10;
  }, [socketData]);
  const outputProgressBarValue = useMemo(() => {
    return parseFloat(socketData?.output_rms ?? "") * 10;
  }, [socketData]);

  const inputDBRealtime = useMemo(
    () => (20 * Math.log10(+(socketData?.input_rms ?? 0))),
    [socketData?.input_rms]
  );
  const outputDBRealtime = useMemo(
    () => (20 * Math.log10(+(socketData?.output_rms ?? 0))),
    [socketData?.output_rms]
  );

  return (
    <div>
      <p>
        <b>Input: </b> {inputDBRealtime.toFixed(2)} dB
      </p>
      <progress
        style={{ transition: "all 0.3s ease" }}
        value={inputProgressBarValue}
        max="1.0"
      ></progress>
      <p>
        <b>Output: </b>{" "}
        {outputDBRealtime.toFixed(2)} dB
      </p>
      <progress
        style={{ transition: "all 0.3s ease" }}
        value={outputProgressBarValue}
        max="1.0"
      ></progress>
      {socketData?.effects.map((effect, index) => (
        <Fragment key={index}>
          {effect.state?.mix ? <EffectControls effect={effect} /> : null}
        </Fragment>
      ))}
      <pre>{JSON.stringify(socketData, null, 2)}</pre>
    </div>
  );
}

export default App;
