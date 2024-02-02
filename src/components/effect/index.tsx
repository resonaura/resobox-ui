// В вашем компоненте React
import React, { useEffect, useState } from "react";
import { IEffect } from "../../interfaces/ISocketData";
import { useDebounce } from "../../tools/events";

export interface IEffectControls {
  effect: IEffect;
}
const EffectControls: React.FC<IEffectControls> = (props) => {
  const [mixValue, setMixValue] = useState(0.4);

  const handleSubmit = async () => {
    // Отправка POST запроса на сервер
    const response = await fetch("http://localhost:8766", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "update_plugin_state",
        effect_type: props.effect.type,
        mix: mixValue,
      }),
    });
    const responseData = await response.text();
    console.log(responseData);
  };

  useEffect(() => {
    setMixValue(+(props.effect.state.mix ?? 0));
  }, [props.effect.state.mix]);

  useDebounce(
    () => {
      handleSubmit();
    },
    [mixValue],
    100
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mix value ({props.effect.type}):
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={mixValue}
          onChange={(e) => setMixValue(parseFloat(e.target.value))}
        />
      </label>
    </form>
  );
};

export default EffectControls;
