<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-time-select
        v-if="model"
        v-model="model[control.id]"
        :start="control.props.start"
        :step="control.props.step"
        :end="control.props.end"
        :placeholder="control.props.placeholder"
        :clearable="control.props.clearable"
        :disabled="control.props.disabled"
        :editable="control.props.editable"
    ></el-time-select>
    <el-time-select
        v-else
        v-model="control.props.defaultValue"
        :start="control.props.start"
        :step="control.props.step"
        :end="control.props.end"
        :placeholder="control.props.placeholder"
        :clearable="control.props.clearable"
        :disabled="control.props.disabled"
        :editable="control.props.editable"
    ></el-time-select>
</template>
