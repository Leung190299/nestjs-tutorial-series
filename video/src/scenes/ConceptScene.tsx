import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type ConceptVisual = {
  title: string;
  bullets: {text: string; sentence: number; icon?: string}[];
};

export const ConceptScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as ConceptVisual;
  // Bullet nhiều và/hoặc bullet dài (dễ wrap 2 dòng) thì thu nhỏ font/gap/padding để trọn khung.
  // <=4 bullet thường giữ nguyên giá trị gốc; ngoại lệ duy nhất là 4 bullet mà cả 4 đều
  // dài >55 ký tự (load=8) — trường hợp đó cũng cần thu nhỏ vì mỗi bullet wrap 2 dòng.
  // (tiền lệ: xem cách CodeScene.tsx co fontSize theo lineCount/longestLine)
  const bulletCount = v.bullets.length;
  const longCount = v.bullets.filter((b) => b.text.length > 55).length;
  const load = bulletCount + longCount;

  let bulletFontSize = 42;
  let iconFontSize = 52;
  let listGap = 44;
  let innerGap = 28;
  let padV = 30;
  let padH = 40;
  let borderRadius = 20;

  if (bulletCount >= 6 || load >= 8) {
    // Tải nặng nhất: 6+ bullet, hoặc 5 bullet nhưng nhiều bullet dài dễ wrap 2 dòng.
    bulletFontSize = 32;
    iconFontSize = 40;
    listGap = 24;
    innerGap = 20;
    padV = 18;
    padH = 28;
    borderRadius = 14;
  } else if (bulletCount >= 5) {
    bulletFontSize = 36;
    iconFontSize = 46;
    listGap = 32;
    innerGap = 24;
    padV = 24;
    padH = 34;
    borderRadius = 16;
  }

  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '100px 140px'}}
    >
      <h2 style={{margin: 0, fontSize: 72, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 70, display: 'flex', flexDirection: 'column', gap: listGap}}>
        {v.bullets.map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: innerGap,
                backgroundColor: theme.panel,
                border: `2px solid ${theme.panelBorder}`,
                borderRadius,
                padding: `${padV}px ${padH}px`,
              }}
            >
              <span style={{fontSize: iconFontSize}}>{b.icon ?? '👉'}</span>
              <span style={{fontSize: bulletFontSize, color: theme.text, lineHeight: 1.4}}>
                {b.text}
              </span>
            </div>
          </Appear>
        ))}
      </div>
    </AbsoluteFill>
  );
};
