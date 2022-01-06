<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <div class="w-full" v-html="control.props.content"></div>
</template>
