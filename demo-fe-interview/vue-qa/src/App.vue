<script setup lang="ts">
import {computed} from 'vue';
import {questions} from './questions';

const q = new URLSearchParams(window.location.search).get('q') ?? '';
const item = computed(() => questions.find((x) => x.id === q));
</script>

<template>
  <main v-if="!item" style="font-family: system-ui; padding: 32px;">
    <h1>Phỏng vấn Vue — ví dụ chạy thật</h1>
    <ul>
      <li v-for="x in questions" :key="x.id">
        <a :href="`/?q=${x.id}`">{{ x.id.toUpperCase() }} — {{ x.title }}</a>
      </li>
    </ul>
  </main>
  <main v-else style="font-family: system-ui; padding: 32px; max-width: 720px; margin: 0 auto;">
    <h1 style="font-size: 22px;">{{ item.id.toUpperCase() }} — {{ item.title }}</h1>
    <p style="color: #666;">{{ item.hint }}</p>
    <component :is="item.component" />
  </main>
</template>
