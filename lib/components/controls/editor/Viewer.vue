<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <div v-html="model[control.id]"></div>
</template>