<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-checkbox-group v-if="model" v-model="model[control.id]" :disabled="control.props.disabled">
        <el-checkbox
            v-for="item in control.props.options"
            :label="item.value"
        >{{ control.props.showOptionLabel ? item.label || item.value : item.value }}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group
        v-else
        v-model="control.props.defaultValue"
        :disabled="control.props.disabled"
    >
        <el-checkbox
            v-for="item in control.props.options"
            :label="item.value"
        >{{ control.props.showOptionLabel ? item.label || item.value : item.value }}</el-checkbox>
    </el-checkbox-group>
</template>
