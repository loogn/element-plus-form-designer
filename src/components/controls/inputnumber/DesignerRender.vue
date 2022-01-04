<script setup>
defineProps({
    control: Object,
    formProps: Object,
    model: Object,
})
</script>

<template>
    <el-form-item
        :class="control.props.customClass"
        :prop="control.id"
        :label-width="(control.props.labelWidth || formProps.labelWidth)"
        :label="control.props.label"
        :rules="control.rules"
    >
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
    </el-form-item>
</template>
