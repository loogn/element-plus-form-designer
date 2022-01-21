<script setup>
defineProps({
    control: Object,
    model: Object,
})

</script>

<template>
    <el-input
        v-if="model"
        type="textarea"
        :rows="control.props.rows"
        :autosize="control.props.autosize"
        v-model="model[control.id]"
        :placeholder="control.props.placeholder"
        :disabled="control.props.disabled"
        :readonly="control.props.readonly"
        :show-word-limit="control.props.showWordLimit"
        :maxlength="control.props.showWordLimit ? control.props.maxlength : undefined"
    ></el-input>
    <el-input
        v-else
        type="textarea"
        :rows="control.props.rows"
        :autosize="control.props.autosize"
        v-model="control.props.defaultValue"
        :placeholder="control.props.placeholder"
        :disabled="control.props.disabled"
        :readonly="control.props.readonly"
        :show-word-limit="control.props.showWordLimit"
        :maxlength="control.props.showWordLimit ? control.props.maxlength : undefined"
    ></el-input>
</template>
