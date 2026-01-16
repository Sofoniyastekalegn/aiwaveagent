
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export type LiveSessionConfig = {
  systemInstruction: string;
  voiceName: string;
  onOpen?: () => void;
  onClose?: (e: CloseEvent) => void;
  onError?: (e: any) => void;
  onAudioChunk?: (base64Audio: string) => void;
  onInterrupted?: () => void;
};

export async function connectLiveSession(config: LiveSessionConfig) {
  // Always create a fresh instance with the most current key from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: {
      onopen: () => {
        config.onOpen?.();
      },
      onmessage: async (message: LiveServerMessage) => {
        const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audio) {
          config.onAudioChunk?.(audio);
        }
        if (message.serverContent?.interrupted) {
          config.onInterrupted?.();
        }
      },
      onerror: (e: any) => config.onError?.(e),
      onclose: (e: any) => config.onClose?.(e),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voiceName } },
      },
      systemInstruction: config.systemInstruction,
    },
  });

  return sessionPromise;
}
