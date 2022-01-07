<script setup>
defineProps({
    control: Object,
})
</script>

<template>
    <el-divider
        :border-style="control.props.borderStyle"
        :content-position="control.props.contentPosition"
    >{{ control.props.content }}</el-divider>
</template>
