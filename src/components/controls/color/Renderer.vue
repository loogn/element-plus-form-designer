<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-color-picker
        v-if="model"
        v-model="model[control.id]"
        :show-alpha="control.props.showAlpha"
        :disabled="control.props.disabled"
        :predefine="control.props.options.map(x => x.value)"
    />
    <el-color-picker
        v-else
        v-model="control.props.defaultValue"
        :show-alpha="control.props.showAlpha"
        :disabled="control.props.disabled"
        :predefine="control.props.options.map(x => x.value)"
    />
</template>
