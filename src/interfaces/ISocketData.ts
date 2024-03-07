export interface ISocketData {
  audio: IAudioInfo
  recording: boolean
  recording_start_time: any
  output_rms: string
  input_rms: string
  looper: ILooper
  effects: IEffect[]
}

export interface IAudioInfo {
  input: IAudioDevice
  output: IAudioDevice
}

export interface IAudioDevice {
  name: string
  index: number
  hostapi: number
  max_input_channels: number
  max_output_channels: number
  default_low_input_latency: number
  default_low_output_latency: number
  default_high_input_latency: number
  default_high_output_latency: number
  default_samplerate: number
}

export interface ILooper {
  sample_rate: number
  is_playing: boolean
  start_time: any
  tracks: ILooperTrack[]
  audio_len: number
  audio_duration: number
  elapsed: number
}

export interface ILooperTrack {
  sample_rate: number
  is_playing: boolean
  is_recording: boolean
  audio_len: number
  audio_duration: number
  layers: any[]
}

export interface IEffect {
  id: string
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
  release_ms?: string
  threshold_db?: string
}
