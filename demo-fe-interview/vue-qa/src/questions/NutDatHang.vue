<script setup lang="ts">
// Component con: nhận prop `mon` từ cha, emit sự kiện `dat` lên cha khi bấm nút.
const props = defineProps<{mon: string}>();
const emit = defineEmits<{dat: [mon: string]}>();

function datHang() {
  emit('dat', props.mon);
}
</script>

<template>
  <button @click="datHang">Đặt "{{ mon }}"</button>
</template>
