import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type OutroVisual = {
  title: string;
  summary: {text: string; sentence: number}[];
  next: string;
};

export const OutroScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as OutroVisual;
  const lastStart = sentenceStart(sentences, Math.max(sentences.length - 1, 0));
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '90px 140px'}}
    >
      <h2 style={{margin: 0, fontSize: 72, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 60, display: 'flex', flexDirection: 'column', gap: 38}}>
        {v.summary.map((item, i) => (
          <Appear key={i} at={sentenceStart(sentences, item.sentence)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <span style={{fontSize: 44, color: theme.green}}>✔</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{item.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      <Appear at={lastStart}>
        <div
          style={{
            marginTop: 70,
            backgroundColor: theme.panel,
            border: `3px solid ${theme.accent}`,
            borderRadius: 24,
            padding: '36px 48px',
            display: 'inline-block',
          }}
        >
          <div style={{fontSize: 30, color: theme.accent, fontWeight: 700, marginBottom: 10}}>
            TẬP SAU
          </div>
          <div style={{fontSize: 44, color: theme.text, fontWeight: 700}}>{v.next}</div>
        </div>
      </Appear>
    </AbsoluteFill>
  );
};
