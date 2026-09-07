<script setup lang="ts">
// Composition API: tổ chức theo "logic feature", cùng trong <script setup>.
import {ref} from 'vue';
import OptionsCounter from './OptionsCounter.vue';

const count = ref(0);
function increment() {
  count.value++;
}
</script>

<template>
  <p style="color: #666;">Cùng 1 counter, viết 2 kiểu — cùng kết quả, khác cách tổ chức.</p>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <OptionsCounter />
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
      <b>Composition API (&lt;script setup&gt;)</b>
      <p>count: {{ count }}</p>
      <button @click="increment">+1 (Composition)</button>
    </div>
  </div>
</template>
