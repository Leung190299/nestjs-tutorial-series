import type {ComponentType} from 'react';
import {R1VirtualDom} from './R1VirtualDom';
import {R2Effects} from './R2Effects';
import {R3KeyProp} from './R3KeyProp';
import {R4Controlled} from './R4Controlled';
import {R5Memo} from './R5Memo';
import {R6CustomHook} from './R6CustomHook';

export type Question = {
  id: string;
  title: string;
  hint: string;
  component: ComponentType;
};

export const questions: Question[] = [
  {
    id: 'r1',
    title: 'Virtual DOM & reconciliation',
    hint: 'React diff cây Virtual DOM cũ/mới rồi chỉ vá đúng phần DOM thật thay đổi, không render lại toàn bộ.',
    component: R1VirtualDom,
  },
  {
    id: 'r2',
    title: 'useState vs useEffect',
    hint: 'useEffect chạy SAU render để đồng bộ với thứ bên ngoài React; cleanup chạy trước lần effect sau và khi unmount.',
    component: R2Effects,
  },
  {
    id: 'r3',
    title: 'key trong list — vì sao không nên dùng index',
    hint: 'key giúp React nhận diện phần tử giữ nguyên/thêm/xóa/di chuyển; dùng index làm key có thể làm state gắn sai dòng.',
    component: R3KeyProp,
  },
  {
    id: 'r4',
    title: 'Controlled vs Uncontrolled component',
    hint: 'Controlled: React state giữ giá trị (value + onChange); Uncontrolled: DOM tự giữ giá trị, đọc qua ref khi cần.',
    component: R4Controlled,
  },
  {
    id: 'r5',
    title: 'React.memo với prop object',
    hint: 'React.memo so sánh nông (shallow) props; truyền object literal mới mỗi render làm memo vô dụng, phải dùng useMemo.',
    component: R5Memo,
  },
  {
    id: 'r6',
    title: 'Custom Hook — useDebouncedValue',
    hint: 'Custom hook chỉ là hàm dùng hook khác bên trong, tách logic tái sử dụng ra khỏi component.',
    component: R6CustomHook,
  },
];
