<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-switch
        v-model="model[control.id]"
        :inline-prompt="control.props.inlinePrompt"
        :active-text="control.props.activeText"
        :inactive-text="control.props.inactiveText"
        :disabled="true"
        :active-color="control.props.activeColor"
        :inactive-color="control.props.inactiveColor"
    />
</template>
