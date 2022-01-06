<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-divider
        :border-style="control.props.borderStyle"
        :content-position="control.props.contentPosition"
    >{{ control.props.content }}</el-divider>
</template>
