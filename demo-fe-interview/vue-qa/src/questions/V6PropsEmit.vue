<script setup lang="ts">
import {ref} from 'vue';
import NutDatHang from './NutDatHang.vue';

const mons = ['Phở bò', 'Bánh mì', 'Cơm tấm'];
const donHang = ref<string[]>([]);

function nhanDon(mon: string) {
  // Cha nhận sự kiện `dat` con emit lên, tự quyết định xử lý (one-way, con không tự ý đổi state cha)
  donHang.value.push(mon);
}
</script>

<template>
  <p style="color: #666;">Props xuống, emit lên — một chiều. Cha truyền `mon`, con emit `dat` khi bấm.</p>
  <div style="display: flex; gap: 8px;">
    <NutDatHang v-for="mon in mons" :key="mon" :mon="mon" @dat="nhanDon" />
  </div>
  <b>Log đơn hàng ({{ donHang.length }}):</b>
  <ul>
    <li v-for="(d, i) in donHang" :key="i">Đơn #{{ i + 1 }}: {{ d }}</li>
  </ul>
</template>
