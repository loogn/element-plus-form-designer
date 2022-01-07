<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-slider
        v-if="model"
        style="margin:0 8px;width:100%"
        v-model="model[control.id]"
        :disabled="control.props.disabled"
        :min="control.props.min"
        :max="control.props.max"
        :step="control.props.step"
        :show-input="control.props.showInput"
        :show-stops="control.props.showStops"
        :show-tooltip="control.props.showTooltip"
    ></el-slider>
    <el-slider
        v-else
        style="margin:0 8px;width:100%"
        v-model="control.props.defaultValue"
        :disabled="control.props.disabled"
        :min="control.props.min"
        :max="control.props.max"
        :step="control.props.step"
        :show-input="control.props.showInput"
        :show-stops="control.props.showStops"
        :show-tooltip="control.props.showTooltip"
    ></el-slider>
</template>
