<script setup lang="ts">
import {reactive, ref} from 'vue';

const counterRef = ref(0);
const state = reactive({count: 0});
// BẪY: destructure từ reactive → biến thường, MẤT reactivity
let {count: broken} = state;

function tangCa3() {
  counterRef.value++;
  state.count++;
  broken++; // biến này tăng nhưng UI không bao giờ thấy
}
</script>

<template>
  <button @click="tangCa3">Tăng cả 3 (+1)</button>
  <ul>
    <li>ref: {{ counterRef }}</li>
    <li>reactive.count: {{ state.count }}</li>
    <li>biến destructure: {{ broken }} — đứng yên vì đã MẤT reactivity!</li>
  </ul>
</template>
