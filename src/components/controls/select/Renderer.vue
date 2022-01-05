<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-select
        v-model="model[control.id]"
        :disabled="control.props.disabled"
        :clearable="control.props.clearable"
        :filterable="control.props.filterable"
        :placeholder="control.props.placeholder"
    >
        <el-option
            v-for="item in control.props.options"
            :value="item.label"
            :label="control.props.showOptionLabel ? item.text || item.label : item.label"
        ></el-option>
    </el-select>
</template>
