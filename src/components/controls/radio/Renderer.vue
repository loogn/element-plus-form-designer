<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-radio-group v-model="model[control.id]" :disabled="control.props.disabled">
        <el-radio
            v-for="item in control.props.options"
            :label="item.label"
        >{{ control.props.showOptionLabel ? item.text || item.label : item.label }}</el-radio>
    </el-radio-group>
</template>
