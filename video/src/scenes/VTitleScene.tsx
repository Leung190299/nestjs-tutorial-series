import React from 'react';
import {AbsoluteFill} from 'remotion';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type VTitleVisual = {question: string; framework: 'react' | 'vue'};

const FW = {
  react: {label: 'React', emoji: '⚛️', color: '#61dafb'},
  vue: {label: 'Vue', emoji: '💚', color: '#42b883'},
};

export const VTitleScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as VTitleVisual;
  const fw = FW[v.framework];
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 60, justifyContent: 'center'}}>
      <div style={{alignSelf: 'center', backgroundColor: fw.color, color: '#0f172a', borderRadius: 999, padding: '14px 40px', fontSize: 44, fontWeight: 900}}>
        {fw.emoji} PHỎNG VẤN {fw.label.toUpperCase()}
      </div>
      <h1 style={{marginTop: 70, fontSize: 88, fontWeight: 900, color: theme.text, textAlign: 'center', lineHeight: 1.25}}>
        {v.question}
      </h1>
      <div style={{marginTop: 70, alignSelf: 'center', color: theme.accent, fontSize: 40, fontWeight: 800}}>
        ■ Trả lời trong 60 giây
      </div>
    </AbsoluteFill>
  );
};
