<script setup lang="ts">
import {computed, ref, watch, watchEffect} from 'vue';

const km = ref(10);
const giaPerKm = ref(15000);
const logs = ref<string[]>([]);
let soLanTinh = 0;

const tongTien = computed(() => {
  soLanTinh++; // đếm số LẦN TÍNH thật — chứng minh computed có cache
  return km.value * giaPerKm.value;
});

watch(km, (newKm, oldKm) => {
  logs.value.push(`watch: km đổi ${oldKm} → ${newKm}`);
});

watchEffect(() => {
  // tự động track km.value + giaPerKm.value; chạy NGAY lần đầu (eager)
  logs.value.push(`watchEffect: km=${km.value}, giá/km=${giaPerKm.value}`);
});

function doiKm(delta: number) {
  km.value += delta;
}
</script>

<template>
  <div>
    <p>
      km: <b>{{ km }}</b>
      <button @click="doiKm(5)">+5km</button>
      <button @click="doiKm(-5)">-5km</button>
      · giá/km: <b>{{ giaPerKm.toLocaleString('vi-VN') }}đ</b>
    </p>
    <p>
      Tổng tiền (computed): <b>{{ tongTien.toLocaleString('vi-VN') }}đ</b>
      — đã tính lại <b>{{ soLanTinh }}</b> lần (đọc {{ tongTien }} nhiều lần không tăng số này, nhờ cache)
    </p>
    <p>{{ tongTien }} {{ tongTien }} {{ tongTien }}</p>
    <b>Log watch / watchEffect:</b>
    <ul>
      <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
    </ul>
  </div>
</template>
