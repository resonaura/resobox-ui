import { useEffect, useMemo, useState } from "react";
import MixControl from "./components/mix";
import { ISocketData } from "./interfaces/ISocketData";

function App() {
  const [socketData, setSocketData] = useState<ISocketData | null>(null);

  useEffect(() => {
      let websocket: WebSocket | null = null;

      const connectWebSocket = () => {
          websocket = new WebSocket('ws://localhost:8765');

          websocket.onopen = () => {
              console.log('WebSocket Connected');
          };

          websocket.onmessage = (event) => {
              // Предполагается, что сервер отправляет значения громкости в диапазоне от 0 до 1
              setSocketData(JSON.parse(event.data));
          };

          websocket.onclose = (e) => {
              console.log('WebSocket Disconnected. Attempting to reconnect...', e.reason);
              setTimeout(connectWebSocket, 1000); // Попытка переподключения через 1 секунду
          };

          websocket.onerror = (err) => {
              console.error('WebSocket encountered error: ', err, 'Closing socket');
              websocket?.close();
          };
      };

      connectWebSocket();

      return () => {
          websocket?.close();
      };
  }, []);

  const inputRMS = useMemo(() => {
    return parseFloat(socketData?.input_rms ?? '') * 10;
  }, [socketData]);
  const outputRMS = useMemo(() => {
    return parseFloat(socketData?.output_rms ?? '') * 10;
  }, [socketData]);

  return (
      <div>
          <h1>Current RMS</h1>
          <p>{outputRMS.toFixed(2)}</p>
          <progress style={{transition: 'all 0.3s ease'}} value={inputRMS} max="1.0"></progress>
          <progress style={{transition: 'all 0.3s ease'}} value={outputRMS} max="1.0"></progress>
          <pre>{JSON.stringify(socketData, null, 2)}</pre>
          <MixControl />
      </div>
  );
}

export default App;
