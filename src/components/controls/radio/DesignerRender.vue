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
        <el-radio-group v-model="model[control.id]" :disabled="control.props.disabled">
            <el-radio
                v-for="item in control.props.options"
                :label="item.label"
            >{{ control.props.showOptionLabel ? item.text || item.label : item.label }}</el-radio>
        </el-radio-group>
    </el-form-item>
</template>
