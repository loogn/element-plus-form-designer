<script setup>
import { ref, reactive, provide } from 'vue'
import NameIcon from "./NameIcon.vue";
import draggable from 'vuedraggable';
import _ from "lodash";
import FormPropsEditor from './controls/FormPropsEditor.vue';
import groups from "./controls/controls";
//最终formjson数据
let formData = reactive({
    controls: [],
    props: {
        labelPosition: "right",
        labelWidth: 100,
        size: "default",
        showMessage: true,
        customClass: "",
        cols: 12,
    }
});
let data = reactive({
    activeControl: null,
    propTab: "control",
    model: {},
});
//组件的属性
let props = defineProps({

})
provide('rules', data.rules);
//添加控件
function addControl(ctlType) {
    var control = new ctlType();
    data.model[control.id] = control.props.defaultValue;
    formData.controls.push(control);
    data.activeControl = control;
}
//克隆控件
function clone(ctlType) {
    var control = new ctlType();
    data.model[control.id] = control.props.defaultValue;
    return control;
}
//拖动控件
function onChange(evt) {
    console.log('改变', evt);
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
}
////删除控件
function handleDelete(control) {
    if (data.activeControl != null && control.id == data.activeControl.id) {
        data.activeControl = null;
    }
    delete data.model[control.id];
    _.remove(formData.controls, c => {
        return c.id == control.id
    });
}
//复制控件
function handleCopy(control) {
    let ctl = control.clone();
    formData.controls.push(ctl);
    data.model[ctl.id] = ctl.props.defaultValue;
}
//清空控件
function clearControl() {
    formData.controls.length = 0;
    data.model = {};
}

let form = ref(null);


function submit() {
    console.log('--formdata-', formData);
    console.log('--model-', data.model);

    form.value.validate((valid, obj) => {
        console.log('验证结果：', valid, obj);

    })
}
</script>

<template>
    <div class="epfd-container">
        <div class="epdf-left-board">
            <div v-for="group in groups">
                <div class="epdf-com-title">
                    <el-icon>
                        <NameIcon name="component" />
                    </el-icon>
                    <span>{{ group.name }}</span>
                </div>

                <draggable
                    :list="group.types"
                    item-key="type"
                    tag="ul"
                    class="epdf-com-group"
                    :clone="clone"
                    :sort="false"
                    :group="{ name: 'com', pull: 'clone', put: false }"
                >
                    <template #item="{ element }">
                        <li class="epdf-com-label" @click="addControl(element)">
                            <el-icon>
                                <NameIcon :name="element.type" />
                            </el-icon>
                            <span>{{ element.label }}</span>
                        </li>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="epdf-center-board">
            <div class="epdf-toolbar">
                <el-button type="text" @click="clearControl">清空</el-button>
                <el-button type="primary" @click="submit">button</el-button>
            </div>
            <el-form
                ref="form"
                class="epdf-form"
                :label-position="formData.props.labelPosition"
                :label-width="formData.props.labelWidth"
                :size="formData.props.size"
                :class="formData.props.customClass"
                :model="data.model"
                :status-icon="false"
            >
                <draggable
                    :list="formData.controls"
                    item-key="id"
                    class="flex flex-grow flex-wrap overflow-y-auto content-start"
                    @change="onChange"
                    :sort="true"
                    :group="{ name: 'com', pull: true, put: true }"
                >
                    <template #item="{ element }">
                        <div
                            @click="handleSelect(element)"
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
                                    :is="element._renderer"
                                    :control="element"
                                    :model="data.model"
                                />
                            </el-form-item>
                            <div class="opt">
                                <el-icon @click.stop="handleCopy(element)">
                                    <NameIcon name="CopyDocument"></NameIcon>
                                </el-icon>
                                <el-icon @click.stop="handleDelete(element)">
                                    <NameIcon name="Delete"></NameIcon>
                                </el-icon>
                            </div>
                        </div>
                    </template>
                </draggable>
            </el-form>
        </div>
        <div class="epdf-right-board">
            <el-tabs v-model="data.propTab">
                <el-tab-pane label="控件属性" name="control">
                    <template v-if="data.activeControl != null">
                        <component
                            :is="data.activeControl._propEditor"
                            :control="data.activeControl"
                            :formProps="formData.props"
                        />
                    </template>
                </el-tab-pane>
                <el-tab-pane label="表单属性" name="form">
                    <FormPropsEditor :formProps="formData.props" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss">
.epfd-container {
    @apply w-full h-full overflow-hidden flex font-mono;
    .epdf-left-board {
        @apply space-y-5 text-gray-600 text-sm bg-white shadow box-border px-4 pt-6 flex-shrink-0;
        width: 260px;
        .epdf-com-title {
            @apply flex items-baseline;
            span {
                @apply ml-1;
            }
        }
        .epdf-com-group {
            @apply grid grid-cols-2 gap-y-1 gap-x-1.5 mt-2;
        }
        .epdf-com-label {
            @apply bg-gray-100 text-xs text-gray-600 px-3 py-1.5 box-border
            flex items-center
            border border-dashed border-transparent;
            &:hover {
                @apply border-blue-500 text-blue-500 cursor-move;
            }
            span {
                @apply ml-1.5;
            }
        }
    }
    .epdf-center-board {
        @apply flex flex-col flex-grow;

        .epdf-toolbar {
            @apply border-b bg-white;
        }
        .epdf-form {
            @apply flex-1 flex flex-col min-h-full p-2 bg-gray-50 overflow-auto;
        }

        .epdf-form-item-wrap {
            .opt {
                @apply hidden absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
            }
            @apply relative border border-dashed box-border p-2 bg-blue-50 cursor-move;
            .el-form-item__label {
                @apply cursor-move;
            }
            &:hover,
            &.is-selected {
                @apply bg-blue-100 border-blue-500 border-solid;
                .opt {
                    @apply flex;
                }
            }
        }
        li {
            @apply list-none justify-center text-blue-500 flex items-center px-20 py-5 border border-dashed w-full;
            span {
                @apply ml-1.5;
            }
        }
    }

    .epdf-right-board {
        @apply bg-white shadow box-border flex-shrink-0 p-3 overflow-y-auto;
        width: 350px;
    }
}
</style>
