<script setup>
import { ref, provide, inject } from "vue";
import types from "./controls";
import draggable from "vuedraggable/src/vuedraggable";
import NameIcon from "../NameIcon.vue";
import { randomWord, stringifyJson, parseJson } from "../utils";

//组件的属性
let props = defineProps({
    controls: {
        type: Array,
        required: true,
    },
    uploadOptions: {
        type: Object,
        default: {
            action: "",
            getHeaders: () => ({}),
            getFileHook: (response, file) => ({ name: file, url: response.url }),
        },
    },
});

let data = inject("data");
let formProps = inject("formProps");

console.log("formProps", formProps);

//#region 操作控件

//添加控件
function addControl(ctlType) {
    var control = new ctlType();
    props.controls.push(control);
    data.activeControl = control;
}
//克隆控件
function clone(ctlType) {
    var control = new ctlType();
    return control;
}
//复制控件
function handleCopy(originControl) {
    let control = parseJson(stringifyJson(originControl));
    control.id = randomWord(false, 9);
    control.lock = false;
    props.controls.push(control);
}
//拖动控件
function onChange(evt) {
    let control = (evt.added || evt.moved).element;
    if (evt.added) {
        data.activeControl = control;
    } else if (evt.moved) {
        data.activeControl = control;
    }
}
//选中控件
function handleSelect(control) {
    data.activeControl = control;
    console.log(data.activeControl)
}
//删除控件
function handleDelete(control, index) {
    if (data.activeControl != null && control.id == data.activeControl.id) {
        data.activeControl = null;
    }
    props.controls.splice(index, 1);
}

//清空控件
function clearControl() {
    for (let i = props.controls.length - 1; i >= 0; i--) {
        let control = props.controls[i];
        if (!control.lock) {
            props.controls.splice(i, 1);
            if (control == data.activeControl) {
                data.activeControl = null;
            }
        }
    }
}
//#endregion
</script>

<template>
    <draggable
        :list="controls"
        item-key="id"
        class="epdf-form-draggable"
        @change="onChange"
        :sort="true"
        :group="{ name: 'com', pull: true, put: true }"
    >
        <template #item="{ element, index }">
            <div
                @click.stop="handleSelect(element)"
                class="epdf-form-item-wrap"
                :class="{ 'is-selected': data.activeControl == element }"
                :style="{ width: (element.props.width * 100) / formProps.cols + '%' }"
            >
                <el-form-item
                    v-if="element.type != 'tab'"
                    :class="element.props.customClass"
                    :prop="element.id"
                    :label-width="
                        element.props.showLabel
                            ? element.props.labelWidth || formProps.labelWidth
                            : '0'
                    "
                    :label="element.props.showLabel ? element.props.label : ' '"
                    :rules="element.rules"
                >
                    <component :is="types[element.type].Renderer" :control="element" />
                </el-form-item>
                <component
                    v-if="element.type == 'tab'"
                    :is="types[element.type].Renderer"
                    :control="element"
                />
                <div class="opt" v-if="data.activeControl == element">
                    <el-icon @click.stop="handleCopy(element)">
                        <NameIcon name="copy"></NameIcon>
                    </el-icon>
                    <el-icon v-if="!element.lock" @click.stop="handleDelete(element, index)">
                        <NameIcon name="delete"></NameIcon>
                    </el-icon>
                </div>
            </div>
        </template>
    </draggable>
</template>

<style lang="scss" scoped>
.epdf-form-item-wrap {
    .opt {
        @apply flex absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
    }
    @apply relative border border-dashed box-border  p-2  cursor-move;
    .el-form-item__label {
        @apply cursor-move;
    }
    /* &:hover, */
    &.is-selected {
        @apply bg-blue-50 border-blue-500 border-solid;
        .opt {
            @apply flex;
        }
    }
}
</style>
