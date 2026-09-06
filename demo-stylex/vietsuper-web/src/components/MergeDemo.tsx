import * as stylex from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const styles = stylex.create({
  row: {fontSize: 22, fontWeight: 700, padding: '8px 0'},
  grey: {color: '#6b7280'},
  brand: {color: tokens.brand},
});

export function MergeDemo() {
  return (
    <div>
      <p {...stylex.props(styles.row, styles.grey, styles.brand)}>
        props(grey, brand) — brand ĐỨNG SAU nên chữ này màu ĐỎ
      </p>
      <p {...stylex.props(styles.row, styles.brand, styles.grey)}>
        props(brand, grey) — grey ĐỨNG SAU nên chữ này màu XÁM
      </p>
    </div>
  );
}
