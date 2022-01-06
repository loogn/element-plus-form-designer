<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <div>{{ control.props.content }}</div>
</template>
