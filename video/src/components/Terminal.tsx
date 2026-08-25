import React from 'react';
import {theme} from './theme';

export const Terminal: React.FC<{title?: string; children: React.ReactNode}> = ({
  title = 'zsh — demo-app',
  children,
}) => (
  <div
    style={{
      backgroundColor: '#0b1120',
      borderRadius: 16,
      border: `2px solid ${theme.panelBorder}`,
      overflow: 'hidden',
      fontFamily: theme.fontMono,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 24px',
        backgroundColor: theme.panel,
      }}
    >
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <div key={c} style={{width: 18, height: 18, borderRadius: 9, backgroundColor: c}} />
      ))}
      <span style={{marginLeft: 12, color: theme.textDim, fontSize: 24}}>{title}</span>
    </div>
    <div style={{padding: '28px 32px', fontSize: 30, lineHeight: 1.7}}>{children}</div>
  </div>
);
