<script setup>
import { ref, reactive, toRaw, nextTick } from 'vue'
import NameIcon from "./NameIcon.vue";
import _ from "lodash";
import { types } from "./controls/controls";

//组件的属性
let props = defineProps({
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
        }
    },
    formModel: Object,
})

let form = ref(null);
function submit() {
    console.log('--formdata-', formData);
    console.log('--model-', data.model);

    form.value.validate((valid, obj) => {
        console.log('验证结果：', valid, obj);
    })
}

defineExpose({
    viewJson,
    getJson,
    clearControl,
});

</script>

<template>
    <div class="epfd-container">
        <div class="epdf-center-board">
            <div class="epdf-form-container">
                <el-form
                    ref="form"
                    class="epdf-form"
                    :label-position="formData.props.labelPosition"
                    :label-width="formData.props.labelWidth"
                    :size="formData.props.size"
                    :class="[formData.props.customClass]"
                    :model="data.model"
                    :status-icon="false"
                >
                    <div
                        v-for="(element,index) in formData.controls"
                        :key="index"
                        class="epdf-form-item-wrap"
                        :class="{ 'is-selected': data.activeControl == element }"
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
                                :is="types['$' + element.type].Renderer"
                                :control="element"
                                :model="formModel"
                            />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.epfd-container {
    @apply w-full h-full overflow-hidden flex;
    background-color: #f7f7f7;

    .epdf-center-board {
        @apply flex flex-col flex-grow items-center;

        .epdf-form-container {
            @apply p-3 flex-1 overflow-auto w-full;
        }
        .epdf-form {
            @apply box-border flex flex-col min-h-full bg-white;
        }
        .epdf-form-item-wrap {
            @apply border border-dashed box-border p-2;
        }
    }
}
</style>
