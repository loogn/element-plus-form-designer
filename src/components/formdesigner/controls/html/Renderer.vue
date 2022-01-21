<script setup>
defineProps({
    control: Object,
})
</script>

<template>
    <div v-html="control.props.content"></div>
</template>
