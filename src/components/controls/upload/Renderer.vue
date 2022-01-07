<script setup>
defineProps({
    control: Object,
    uploadOptions: {
        type: Object,
        default: {
            action: '',
            getHeaders: () => ({})
        }
    }
})
</script>

<template>
    <div>{{ control.props.content }}</div>
</template>
