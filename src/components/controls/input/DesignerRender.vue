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
        <el-input
            :type="control.props.type"
            :show-password="control.props.showPassword"
            v-model="model[control.id]"
            :placeholder="control.props.placeholder"
            :clearable="control.props.clearable"
            :disabled="control.props.disabled"
            :readonly="control.props.readonly"
            :show-word-limit="control.props.showWordLimit"
            :maxlength="control.props.showWordLimit ? control.props.maxlength : undefined"
        ></el-input>
    </el-form-item>
</template>
