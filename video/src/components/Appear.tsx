import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Appear: React.FC<{
  at: number;
  dy?: number;
  children: React.ReactNode;
}> = ({at, dy = 40, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 200}});
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * dy}px)`}}>
      {children}
    </div>
  );
};
