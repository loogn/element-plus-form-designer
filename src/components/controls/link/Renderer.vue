<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-link
        :type="control.props.type"
        :underline="control.props.underline"
        :href="control.props.href"
        :target="control.props.target"
        :disabled="control.props.disabled"
    >{{ control.props.content }}</el-link>
</template>
