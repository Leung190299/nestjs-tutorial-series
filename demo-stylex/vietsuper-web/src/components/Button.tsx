import * as stylex from '@stylexjs/stylex';
import type {StyleXStyles} from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const styles = stylex.create({
  base: {
    borderStyle: 'none',
    borderRadius: 12,
    fontWeight: 700,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
  },
  md: {padding: '10px 22px', fontSize: 16},
  lg: {padding: '14px 32px', fontSize: 18},
  primary: {
    color: 'white',
    backgroundColor: {default: tokens.brand, ':hover': tokens.brandDark},
  },
  ghost: {
    color: tokens.brand,
    backgroundColor: {default: 'transparent', ':hover': 'rgba(234,40,69,0.08)'},
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: tokens.brand,
  },
  danger: {
    color: 'white',
    backgroundColor: {default: '#b91c1c', ':hover': '#7f1d1d'},
  },
});

type Props = {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'md' | 'lg';
  style?: StyleXStyles;
  children: React.ReactNode;
};

export function Button({variant = 'primary', size = 'md', style, children}: Props) {
  return (
    <button {...stylex.props(styles.base, styles[size], styles[variant], style)}>
      {children}
    </button>
  );
}
