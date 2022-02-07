<script setup>
import { ref } from 'vue'
import { types } from "./controls/controls";

//组件的属性
defineProps({
    formData: {
        type: Object,
        default: {
            controls: [],
            props: {
                labelPosition: "right",
                labelWidth: 100,
                size: "default",
                customClass: "",
                cols: 12,
            }
        },
        required: true,
    },
    formModel: {
        type: Object,
        default: {},
        required: true,
    },

})

let form = ref(null);
//验证，回调传入是否验证成功
function validate(callback) {
    form.value.validate(callback);
}
function resetFields() {
    form.value.resetFields();
}
function clearValidate(ps) {
    form.value.clearValidate(ps);
}
function scrollToField(prop) {
    form.value.scrollToField(prop)
}

defineExpose({
    validate,
    resetFields,
    scrollToField,
    clearValidate
});

</script>

<template>
    <el-form
        ref="form"
        class="epdf-form-renderer"
        :label-position="formData.props.labelPosition"
        :label-width="formData.props.labelWidth"
        :size="formData.props.size"
        :class="[formData.props.customClass]"
        :model="formModel"
        :status-icon="false"
    >
        <div
            v-for="(element, index) in formData.controls"
            :key="index"
            class="epdf-form-item-wrap"
            :style="{ 'width': (element.props.width * 100 / formData.props.cols) + '%' }"
        >
            <el-form-item
                :class="element.props.customClass"
                :prop="element.id"
                :label-width="element.props.showLabel ? (element.props.labelWidth || formData.props.labelWidth) : '0'"
                :label="element.props.showLabel ? element.props.label : ' '"
                :rules="element.rules"
            >
                <component
                    :is="types[element.type].Renderer"
                    :control="element"
                    :model="formModel"
                />
            </el-form-item>
        </div>
    </el-form>
</template>

<style lang="scss" scoped>
.epdf-form-renderer {
    @apply flex flex-wrap overflow-y-auto content-start;
}
.epdf-form-item-wrap{
    padding-right: 4px;
}
@media (max-width: 767px) {
    .epdf-form-item-wrap {
        width: 100% !important;
        padding-right: 0px;
    }
}
</style>
