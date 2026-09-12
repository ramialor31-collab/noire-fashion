import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Create low ambient sub-bass drone
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note 55Hz deep atmospheric drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // subtle, non-intrusive ambient hum

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio initialization failed', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          audioCtxRef.current?.close();
          setIsPlaying(false);
        }, 800);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="group flex items-center space-x-2 text-[10px] tracking-widest text-noir-400 hover:text-white transition-colors duration-300 py-1 px-2.5 rounded-full border border-noir-850 bg-noir-900/60 backdrop-blur-md"
      title={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">AMBIENCE ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-noir-400 group-hover:text-white" />
          <span className="hidden sm:inline">SOUNDSCAPE</span>
        </>
      )}
    </button>
  );
};
