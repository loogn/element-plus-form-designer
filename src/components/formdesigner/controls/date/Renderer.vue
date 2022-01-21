<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-date-picker
        v-if="model"
        :type="control.props.type"
        v-model="model[control.id]"
        :placeholder="control.props.placeholder"
        :clearable="control.props.clearable"
        :disabled="control.props.disabled"
        :readonly="control.props.readonly"
        :editable="control.props.editable"
        :value-format="control.props.format"
        :format="control.props.format"
    ></el-date-picker>
    <el-date-picker
        v-else
        :type="control.props.type"
        v-model="control.props.defaultValue"
        :placeholder="control.props.placeholder"
        :clearable="control.props.clearable"
        :disabled="control.props.disabled"
        :readonly="control.props.readonly"
        :editable="control.props.editable"
        :value-format="control.props.format"
        :format="control.props.format"
    ></el-date-picker>
</template>
