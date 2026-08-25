import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CodeBlock} from '../components/CodeBlock';
import {theme} from '../components/theme';
import {useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type CodeVisual = {
  filename: string;
  language: string;
  code: string;
  steps: {from: number; to: number; sentence: number}[];
};

export const CodeScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as CodeVisual;
  const idx = useSentenceIndex(sentences);
  const active = v.steps.filter((s) => s.sentence <= idx);
  const current = active[active.length - 1];
  const visibleUpTo = active.length > 0 ? Math.max(...active.map((s) => s.to)) : 0;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: theme.fontSans,
        padding: '80px 220px',
        justifyContent: 'center',
      }}
    >
      <CodeBlock
        code={v.code}
        language={v.language}
        filename={v.filename}
        visibleUpTo={visibleUpTo}
        highlight={current ? [current.from, current.to] : undefined}
      />
    </AbsoluteFill>
  );
};
