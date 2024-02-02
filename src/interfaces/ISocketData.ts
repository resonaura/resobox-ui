export interface ISocketData {
    recording: boolean
    recording_start_time: any
    output_rms: string
    input_rms: string
    effects: IEffect[]
  }
  
  export interface IEffect {
    type: string
    state: IEffectState
  }
  
  export interface IEffectState {
    impulse_response_filename?: string
    is_effect: string
    is_instrument: string
    mix?: string
    delay_seconds?: string
    feedback?: string
    release_ms?: string;
    threshold_db?: string;
  }
  