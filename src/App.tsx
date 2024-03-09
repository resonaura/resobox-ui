import { Fragment, useEffect, useMemo, useState } from 'react';
import { ISocketData } from './interfaces/ISocketData';
import EffectControls from './components/effect';
import { Progress } from 'antd';
import { Screen } from './components/screen';

function App() {
  const [socketData, setSocketData] = useState<ISocketData | null>(null);

  const server = 'localhost';
  const screenWidth = 128;
  const screenHeight = 32;

  useEffect(() => {
    let websocket: WebSocket | null = null;

    const connectWebSocket = () => {
      websocket = new WebSocket(`ws://${server}:8765`);

      websocket.onopen = () => {
        console.log('WebSocket Connected');
      };

      websocket.onmessage = (event) => {
        // Предполагается, что сервер отправляет значения громкости в диапазоне от 0 до 1
        setSocketData(JSON.parse(event.data));
      };

      websocket.onclose = (e) => {
        console.log(
          'WebSocket Disconnected. Attempting to reconnect...',
          e.reason
        );
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

  const inputProgressBarValue = useMemo(() => {
    return parseFloat(socketData?.input_rms ?? '') * 4;
  }, [socketData]);
  const outputProgressBarValue = useMemo(() => {
    return parseFloat(socketData?.output_rms ?? '') * 4;
  }, [socketData]);

  const inputDBRealtime = useMemo(
    () => 20 * Math.log10(+(socketData?.input_rms ?? 0)),
    [socketData?.input_rms]
  );
  const outputDBRealtime = useMemo(
    () => 20 * Math.log10(+(socketData?.output_rms ?? 0)),
    [socketData?.output_rms]
  );

  return (
    <div>
      {server === 'localhost' && (
        <Screen
          url={`ws://${server}:8767`}
          width={screenWidth}
          height={screenHeight}
        />
      )}
      <p>
        <b>Input</b>
        {socketData?.audio?.input?.name
          ? ` (${socketData.audio.input.name})`
          : ''}
        : {inputDBRealtime.toFixed(0)} dB
      </p>
      <Progress
        style={{ transition: 'all 0s ease' }}
        percent={inputProgressBarValue * 100}
        showInfo={false}
      ></Progress>
      <p>
        <b>Output</b>
        {socketData?.audio?.output?.name
          ? ` (${socketData.audio.output.name})`
          : ''}
        : {outputDBRealtime.toFixed(0)} dB
      </p>
      <Progress
        style={{ transition: 'all 0s ease' }}
        percent={outputProgressBarValue * 100}
        showInfo={false}
      ></Progress>
      {socketData?.effects.map((effect, index) => (
        <Fragment key={index}>
          {effect.state?.mix ? (
            <EffectControls host={`http://${server}:8766`} effect={effect} />
          ) : null}
        </Fragment>
      ))}
      <pre>{JSON.stringify(socketData, null, 2)}</pre>
    </div>
  );
}

export default App;
