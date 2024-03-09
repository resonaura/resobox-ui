import React, { useEffect, useRef } from 'react';

export interface ScreenProps {
  url: string; // URL WebSocket-сервера
  width: number; // Ширина изображения
  height: number; // Высота изображения
}

export const Screen: React.FC<ScreenProps> = ({ url, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    let websocket: WebSocket | null = null;

    const connectWebSocket = () => {
      websocket = new WebSocket(url);

      websocket.onopen = () => {
        console.log('WebSocket Connected');
      };

      websocket.onmessage = (event) => {
        const matrixString = event.data;
        drawMatrix(matrixString, context, width, height);
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
  }, [url, width, height]);

  const drawMatrix = (
    matrixString: string,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pixelWidth = canvasRef.current!.width / width;
    const pixelHeight = canvasRef.current!.height / height;

    const matrix = JSON.parse(matrixString);

    context.fillStyle = 'black';
    context.fillRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    matrix.forEach((pixel: any) => {
      context.fillStyle = 'white';
      context.fillRect(
        pixel[0] * pixelWidth,
        pixel[1] * pixelHeight,
        pixelWidth,
        pixelHeight
      );
    });
  };

  return <canvas className='emulated-screen' ref={canvasRef} width={width * 6} height={height * 6} />;
};
