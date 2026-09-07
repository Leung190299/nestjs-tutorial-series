import type {Component} from 'vue';
import V1RefReactive from './V1RefReactive.vue';
import V2ApiStyles from './V2ApiStyles.vue';
import V3ComputedWatch from './V3ComputedWatch.vue';
import V4IfShow from './V4IfShow.vue';
import V5KeyVFor from './V5KeyVFor.vue';
import V6PropsEmit from './V6PropsEmit.vue';

export type Question = {
  id: string;
  title: string;
  hint: string;
  component: Component;
};

export const questions: Question[] = [
  {
    id: 'v1',
    title: 'ref vs reactive & bẫy destructure',
    hint: 'ref bọc giá trị qua .value; reactive tạo Proxy sâu. Destructure từ reactive mất liên kết Proxy → mất reactivity.',
    component: V1RefReactive,
  },
  {
    id: 'v2',
    title: 'Options API vs Composition API',
    hint: 'Cùng 1 counter viết 2 kiểu tổ chức code — cùng kết quả, khác cách tổ chức.',
    component: V2ApiStyles,
  },
  {
    id: 'v3',
    title: 'computed vs watch vs watchEffect',
    hint: 'computed có cache, chỉ tính lại khi dependency đổi; watch theo dõi nguồn cụ thể (lazy); watchEffect tự track và chạy ngay lần đầu (eager).',
    component: V3ComputedWatch,
  },
  {
    id: 'v4',
    title: 'v-if vs v-show',
    hint: 'v-if thêm/xóa hẳn phần tử khỏi DOM (unmount thật, mất state con); v-show chỉ toggle CSS display, DOM và state con giữ nguyên.',
    component: V4IfShow,
  },
  {
    id: 'v5',
    title: ':key trong v-for — vì sao không nên dùng index',
    hint: ':key giúp Vue nhận diện đúng phần tử để reuse/reorder DOM; dùng index làm key có thể làm state (input) gắn sai dòng — y hệt bẫy ở React.',
    component: V5KeyVFor,
  },
  {
    id: 'v6',
    title: 'Props xuống, emit lên',
    hint: 'Cha truyền dữ liệu xuống con qua props (one-way); con báo sự kiện lên cha qua emit — luồng dữ liệu một chiều.',
    component: V6PropsEmit,
  },
];
