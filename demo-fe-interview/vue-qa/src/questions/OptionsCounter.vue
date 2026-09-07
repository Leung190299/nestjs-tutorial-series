<script lang="ts">
import {defineComponent} from 'vue';

// Options API: tổ chức theo "loại" (data / methods), không dùng <script setup>.
export default defineComponent({
  data() {
    return {count: 0};
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; flex: 1;">
    <b>Options API</b>
    <p>count: {{ count }}</p>
    <button @click="increment">+1 (Options)</button>
  </div>
</template>
