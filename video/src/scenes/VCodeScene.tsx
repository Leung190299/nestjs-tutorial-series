import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CodeBlock} from '../components/CodeBlock';
import {theme} from '../components/theme';
import {useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type VCodeVisual = {
  filename: string;
  language: string;
  code: string;
  steps: {from: number; to: number; sentence: number}[];
};

export const VCodeScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as VCodeVisual;
  const idx = useSentenceIndex(sentences);
  const active = v.steps.filter((s) => s.sentence <= idx);
  const cur = active[active.length - 1] ?? v.steps[0];
  const visibleUpTo = Math.max(...active.map((s) => s.to), v.steps[0].to);
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 50, justifyContent: 'center'}}>
      <CodeBlock
        code={v.code}
        language={v.language}
        filename={v.filename}
        visibleUpTo={visibleUpTo}
        highlight={[cur.from, cur.to]}
        fontSize={34}
      />
    </AbsoluteFill>
  );
};
