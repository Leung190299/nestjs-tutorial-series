<script setup lang="ts">
import {reactive, ref} from 'vue';

const state = reactive({count: 0});
// BẪY: destructure từ reactive → biến thường, MẤT reactivity
let {count: broken} = state;

// So sánh thêm: ref (qua .value) không dính bẫy destructure kiểu này
const counterRef = ref(0);

function tangReactive() {
  state.count++;
}

function tangBroken() {
  broken++; // tăng thật, nhưng Vue không track được nên không tự re-render
}

function tangRef() {
  counterRef.value++;
}
</script>

<template>
  <p style="color: #666; max-width: 480px;">
    Bấm nút phải vài lần: màn hình ĐỨNG IM (mất reactivity). Rồi bấm nút
    trái: UI re-render và lộ giá trị ngầm đã tăng — bug khó lần!
  </p>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <button @click="tangReactive">Tăng reactive.count</button>
    <button @click="tangBroken">Tăng bản destructure</button>
  </div>
  <div style="margin-top: 8px;">
    <button @click="tangRef">Tăng ref (so sánh)</button>
  </div>
  <ul>
    <li>reactive.count: {{ state.count }}</li>
    <li>biến destructure: {{ broken }}</li>
    <li>ref (so sánh): {{ counterRef }}</li>
  </ul>
</template>
