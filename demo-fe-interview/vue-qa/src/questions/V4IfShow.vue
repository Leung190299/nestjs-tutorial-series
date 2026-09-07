<script setup lang="ts">
import {ref} from 'vue';

const showIf = ref(true);
const showShow = ref(true);
</script>

<template>
  <p style="color: #666;">
    Gõ chữ vào cả 2 ô rồi bấm toggle: v-if MẤT chữ (unmount thật), v-show GIỮ chữ (chỉ ẩn CSS).
  </p>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
      <b>v-if</b>
      <button @click="showIf = !showIf">{{ showIf ? 'Ẩn (unmount)' : 'Hiện (mount lại)' }}</button>
      <div v-if="showIf" style="margin-top: 8px;">
        <input placeholder="gõ gì đó..." />
      </div>
      <p v-else style="margin-top: 8px; color: #999;">(đã unmount khỏi DOM)</p>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
      <b>v-show</b>
      <button @click="showShow = !showShow">{{ showShow ? 'Ẩn (display:none)' : 'Hiện lại' }}</button>
      <div v-show="showShow" style="margin-top: 8px;">
        <input placeholder="gõ gì đó..." />
      </div>
    </div>
  </div>
</template>
