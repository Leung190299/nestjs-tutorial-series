import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart, useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type PhoneVisual = {
  title: string;
  // Ảnh chụp màn hình thật từ iOS Simulator; ảnh hiển thị = screen cuối có sentence <= câu hiện tại
  screens: {src: string; sentence: number}[];
  bullets?: {icon?: string; text: string; sentence: number}[];
};

const PHONE_W = 400;
const PHONE_H = 852;

export const PhoneScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as PhoneVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = useSentenceIndex(sentences);
  const active = v.screens.filter((s) => s.sentence <= idx);
  const current = active[active.length - 1] ?? v.screens[0];
  // hiệu ứng nhẹ mỗi lần đổi màn hình
  const switchedAt = sentenceStart(sentences, current.sentence);
  const p = spring({frame: frame - switchedAt, fps, config: {damping: 200}});

  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '90px 110px'}}
    >
      <h2 style={{margin: 0, fontSize: 64, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 50, display: 'flex', flexDirection: 'column', gap: 36, width: 1050}}>
        {(v.bullets ?? []).map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                backgroundColor: theme.panel,
                border: `2px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: '26px 36px',
              }}
            >
              <span style={{fontSize: 46}}>{b.icon ?? '👉'}</span>
              <span style={{fontSize: 38, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      {/* khung điện thoại bên phải */}
      <div
        style={{
          position: 'absolute',
          right: 130,
          top: 90,
          width: PHONE_W,
          height: PHONE_H,
          borderRadius: 54,
          border: `10px solid #334155`,
          overflow: 'hidden',
          backgroundColor: '#000',
          boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
          opacity: 0.35 + p * 0.65,
          transform: `scale(${0.97 + p * 0.03})`,
        }}
      >
        <Img
          src={staticFile(current.src)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
    </AbsoluteFill>
  );
};
