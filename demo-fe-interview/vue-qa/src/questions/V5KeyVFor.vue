<script setup lang="ts">
import {ref} from 'vue';

const itemsIndex = ref(['Phở bò', 'Bánh mì', 'Cơm tấm']);
const itemsKey = ref(['Phở bò', 'Bánh mì', 'Cơm tấm']);

function xoaIndex(item: string) {
  itemsIndex.value = itemsIndex.value.filter((x) => x !== item);
}
function xoaKey(item: string) {
  itemsKey.value = itemsKey.value.filter((x) => x !== item);
}
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
      <b>:key="index" — SAI</b>
      <div v-for="(item, i) in itemsIndex" :key="i" style="display: flex; gap: 8px; margin-top: 8px;">
        <span style="width: 90px;">{{ item }}</span>
        <input placeholder="ghi chú..." />
        <button @click="xoaIndex(item)">Xóa</button>
      </div>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
      <b>:key="item" — ĐÚNG</b>
      <div v-for="item in itemsKey" :key="item" style="display: flex; gap: 8px; margin-top: 8px;">
        <span style="width: 90px;">{{ item }}</span>
        <input placeholder="ghi chú..." />
        <button @click="xoaKey(item)">Xóa</button>
      </div>
    </div>
  </div>
</template>
