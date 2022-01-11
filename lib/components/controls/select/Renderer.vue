<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-select
        v-if="model"
        v-model="model[control.id]"
        :disabled="control.props.disabled"
        :clearable="control.props.clearable"
        :filterable="control.props.filterable"
        :placeholder="control.props.placeholder"
    >
        <el-option
            v-for="item in control.props.options"
            :value="item.value"
            :label="control.props.showOptionLabel ? item.label || item.value : item.value"
        ></el-option>
    </el-select>
    <el-select
        v-else
        v-model="control.props.defaultValue"
        :disabled="control.props.disabled"
        :clearable="control.props.clearable"
        :filterable="control.props.filterable"
        :placeholder="control.props.placeholder"
    >
        <el-option
            v-for="item in control.props.options"
            :value="item.value"
            :label="control.props.showOptionLabel ? item.label || item.value : item.value"
        ></el-option>
    </el-select>
</template>
