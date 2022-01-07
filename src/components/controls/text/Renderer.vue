<script setup>
defineProps({
    control: Object,
})
</script>

<template>
    <div>{{ control.props.content }}</div>
</template>
