<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-radio-group v-if="model" v-model="model[control.id]" :disabled="control.props.disabled">
        <el-radio
            v-for="item in control.props.options"
            :label="item.value"
        >{{ control.props.showOptionLabel ? item.label || item.value : item.value }}</el-radio>
    </el-radio-group>
    <el-radio-group v-else v-model="control.props.defaultValue" :disabled="control.props.disabled">
        <el-radio
            v-for="item in control.props.options"
            :label="item.value"
        >{{ control.props.showOptionLabel ? item.label || item.value : item.value }}</el-radio>
    </el-radio-group>
</template>
