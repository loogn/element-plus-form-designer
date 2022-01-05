<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-color-picker
        v-model="model[control.id]"
        :show-alpha="control.props.showAlpha"
        :disabled="control.props.disabled"
        :size="control.props.size"
        :predefine="control.props.predefine.map(x => x.value)"
    />
</template>
