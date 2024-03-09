// В вашем компоненте React
import React, { useEffect, useState } from "react";
import { IEffect } from "../../interfaces/ISocketData";
import { useDebounce } from "../../tools/events";
import { Slider } from "antd";

export interface IEffectControls {
  effect: IEffect;
  host: string;
}
const EffectControls: React.FC<IEffectControls> = (props) => {
  const [mixValue, setMixValue] = useState(0.4);

  const handleSubmit = async () => {
    // Отправка POST запроса на сервер
    const response = await fetch(props.host, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "update_plugin_state",
        effect_id: props.effect.id,
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
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={mixValue}
          onChange={(value) => setMixValue(value)}
        />
      </label>
    </form>
  );
};

export default EffectControls;
