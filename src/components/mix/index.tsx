// В вашем компоненте React
import React, { useState } from "react";

const MixControl: React.FC = () => {
  const [mixValue, setMixValue] = useState(0.4);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Отправка POST запроса на сервер
    const response = await fetch("http://localhost:8766", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mix: mixValue }),
    });
    const responseData = await response.text();
    console.log(responseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mix value:
        <input
          type="number"
          value={mixValue}
          onChange={(e) => setMixValue(parseFloat(e.target.value))}
          min="0"
          max="1"
          step="0.1"
        />
      </label>
      <button type="submit">Update Mix</button>
    </form>
  );
};

export default MixControl;
