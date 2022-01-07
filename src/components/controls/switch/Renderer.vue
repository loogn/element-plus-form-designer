<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-switch
        v-if="model"
        v-model="model[control.id]"
        :inline-prompt="control.props.inlinePrompt"
        :active-text="control.props.activeText"
        :inactive-text="control.props.inactiveText"
        :disabled="control.props.disabled"
        :active-color="control.props.activeColor"
        :inactive-color="control.props.inactiveColor"
    />
    <el-switch
        v-else
        v-model="control.props.defaultValue"
        :inline-prompt="control.props.inlinePrompt"
        :active-text="control.props.activeText"
        :inactive-text="control.props.inactiveText"
        :disabled="control.props.disabled"
        :active-color="control.props.activeColor"
        :inactive-color="control.props.inactiveColor"
    />
</template>
