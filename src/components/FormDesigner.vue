<script setup>
import { ref, reactive, toRaw, nextTick } from 'vue'
import NameIcon from "./NameIcon.vue";
import draggable from 'vuedraggable';
import _ from "lodash";
import FormPropsEditor from './controls/FormPropsEditor.vue';
import { groups, types } from "./controls/controls";

//最终formjson数据
let formData = reactive({
    controls: [],
    props: {
        labelPosition: "right",
        labelWidth: 100,
        size: "default",
        customClass: "",
        cols: 12,
    }
});

//UI所需数据
let data = reactive({
    activeControl: null,
    propTab: "control",
    model: {},
    device: "pc",
});

//组件的属性
let props = defineProps({

})

//#region 操作控件
//添加控件
function addControl(ctlType) {
    var control = new ctlType();
    if (control.props.defaultValue !== undefined) data.model[control.id] = control.props.defaultValue;
    formData.controls.push(control);
    data.activeControl = control;
}
//克隆控件
function clone(ctlType) {
    var control = new ctlType();
    if (control.props.defaultValue !== undefined) data.model[control.id] = control.props.defaultValue;
    return control;
}
//复制控件
function handleCopy(control) {
    let ctl = control.clone();
    formData.controls.push(ctl);
    if (control.props.defaultValue !== undefined) data.model[ctl.id] = ctl.props.defaultValue;
}
//拖动控件
function onChange(evt) {
    // console.log('改变', evt);
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

//清空控件
function clearControl() {
    formData.controls.length = 0;
    data.model = {};
    data.activeControl = null;
}
//#endregion

let form = ref(null);
function submit() {
    console.log('--formdata-', formData);
    console.log('--model-', data.model);

    form.value.validate((valid, obj) => {
        console.log('验证结果：', valid, obj);

    })
}
//#region 查看json
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
// 语法检测
// import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'; // For vite
// ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);
// :options="{ useWorker: true }"
let dialogVisible = ref(false);

let aceEditor = ref(null);
let json = ref(null);
function viewJson() {
    json.value = getJson(true)
    dialogVisible.value = true;
}
//#endregion

function getJson(format) {
    let obj = toRaw(formData);

    if (format) {
        return JSON.stringify(obj, null, 2);
    } else {
        return JSON.stringify(obj);
    }
}

defineExpose({
    viewJson,
    getJson,
    clearControl,
});

</script>

<template>
    <el-dialog v-model="dialogVisible" title="查看JSON" width="600px">
        <VAceEditor
            class="-my-8 border"
            ref="aceEditor"
            :readonly="true"
            v-model:value="json"
            lang="json"
            theme="chrome"
            style="height: 400px"
        />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>

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
                <div class="epdf-devices text-lg">
                    <el-icon
                        @click="data.device = device"
                        class="icon"
                        :class="{ 'is-selected': data.device == device }"
                        v-for="device in ['pc', 'pad', 'mobile']"
                    >
                        <NameIcon :name="device" />
                    </el-icon>
                </div>

                <div>
                    <el-popconfirm
                        confirmButtonText="是"
                        cancelButtonText="否"
                        title="确定要清空组件吗?"
                        @confirm="clearControl"
                    >
                        <template #reference>
                            <el-button type="text">清空</el-button>
                        </template>
                    </el-popconfirm>

                    <el-button type="text" @click="clearControl">预览</el-button>
                    <el-button type="text" @click="viewJson">查看JSON</el-button>
                    <el-button type="text" @click="submit">提交？</el-button>
                </div>
            </div>
            <div class="epdf-form-container" :class="[data.device]">
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
                                        :is="types['$' + element.type].Renderer"
                                        :control="element"
                                        :model="data.model"
                                    />
                                </el-form-item>
                                <div class="opt">
                                    <el-icon @click.stop="handleCopy(element)">
                                        <NameIcon name="copy"></NameIcon>
                                    </el-icon>
                                    <el-icon @click.stop="handleDelete(element)">
                                        <NameIcon name="delete"></NameIcon>
                                    </el-icon>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </el-form>
            </div>
        </div>
        <div class="epdf-right-board">
            <el-tabs v-model="data.propTab">
                <el-tab-pane label="控件属性" name="control">
                    <template v-if="data.activeControl != null">
                        <component
                            :is="types['$' + data.activeControl.type].PropEditor"
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
    @apply w-full h-full overflow-hidden flex;
    background-color: #f7f7f7;
    .epdf-left-board {
        @apply space-y-5 z-10 text-gray-600 text-sm bg-white shadow box-border px-4 pt-6 flex-shrink-0;
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
            @apply bg-gray-100 text-sm text-gray-600 px-3 py-1.5 box-border
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
        @apply flex flex-col flex-grow items-center;

        .epdf-toolbar {
            @apply border-b bg-white w-full px-3 py-1  flex justify-between items-center;

            .epdf-devices {
                @apply flex items-center space-x-2;
                .is-selected {
                    @apply bg-gray-200 text-blue-500;
                }
                .icon {
                    @apply w-7 h-7 p-0.5 rounded cursor-pointer;
                }
            }
        }
        .epdf-form-container {
            @apply p-3 flex-1 overflow-auto;
        }
        .epdf-form {
            @apply box-border flex flex-col min-h-full bg-white;
        }
        .epdf-form-container.pc {
            width: 100%;
        }
        .epdf-form-container.mobile {
            width: 375px;
        }
        .epdf-form-container.pad {
            width: 770px;
        }

        .epdf-form-item-wrap {
            .opt {
                @apply hidden absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
            }
            @apply relative border border-dashed box-border p-2  cursor-move;
            .el-form-item__label {
                @apply cursor-move;
            }
            &:hover,
            &.is-selected {
                @apply bg-blue-50 border-blue-500 border-solid;
                .opt {
                    @apply flex;
                }
            }
        }
        li.epdf-com-label {
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
