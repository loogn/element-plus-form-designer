<script setup>
let props = defineProps({
    control: Object,
    model: Object,
})
import data from './data.json';

function onChange(value) {
    if (value == null) {
        if (props.model) {
            props.model[props.control.id] = [];
        } else {
            props.control.props.defaultValue = [];
        }
    }
}
</script>

<template>
    <el-cascader
        v-if="model"
        v-model="model[control.id]"
        :placeholder="control.props.placeholder"
        :show-all-levels="control.props.showAllLevels"
        :disabled="control.props.disabled"
        :clearable="control.props.clearable"
        :filterable="control.props.filterable"
        :props="{
            expandTrigger: control.props.expandTrigger,
            multiple: control.props.multiple,
            checkStrictly: control.props.checkStrictly,
            emitPath: control.props.emitPath,
            value: control.props.valueField
        }"
        @change="onChange"
        :options="data"
    ></el-cascader>

    <el-cascader
        v-else
        v-model="control.props.defaultValue"
        :placeholder="control.props.placeholder"
        :show-all-levels="control.props.showAllLevels"
        :disabled="control.props.disabled"
        :clearable="control.props.clearable"
        :filterable="control.props.filterable"
        :props="{
            expandTrigger: control.props.expandTrigger,
            multiple: control.props.multiple,
            checkStrictly: control.props.checkStrictly,
            emitPath: control.props.emitPath,
            value: control.props.valueField
        }"
        @change="onChange"
        :options="data"
    ></el-cascader>
</template>
