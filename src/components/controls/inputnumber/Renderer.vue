<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-input-number
        :type="control.props.type"
        v-model="model[control.id]"
        :placeholder="control.props.placeholder"
        :disabled="control.props.disabled"
        :min="control.props.min"
        :max="control.props.max"
        :step="control.props.step"
        :step-strictly="control.props.stepStrictly"
        :precision="control.props.precision"
        :controls="control.props.controls"
        :controlsPosition="control.props.controlsPosition"
    ></el-input-number>
</template>
