<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'FormDesigner'
});
</script>
<script setup>
import { ref, reactive, provide } from 'vue'
import NameIcon from "./NameIcon.vue";
import draggable from 'vuedraggable';
import FormPropsEditor from './controls/FormPropsEditor.vue';
import { groups, types } from "./controls/controls";
import { randomWord } from "./utils";
//组件的属性
let props = defineProps({
    formData: {
        type: Object,
        required: true,
    },
    uploadOptions: {
        type: Object,
        default: {
            action: '',
            getHeaders: () => ({}),
            getFileHook: (response, file) => ({ name: file, url: response.url })
        }
    }
});
provide('uploadOptions', props.uploadOptions);
// UI所需数据
let data = reactive({
    activeControl: null,
    propTab: "control",
    device: "pc"
});


let defaultFormProps = {
    labelPosition: "right",
    labelWidth: 100,
    size: "default",
    customClass: "",
    cols: 12,
};

if (props.formData.controls == undefined) {
    props.formData.controls = [];
}


if (props.formData.props == undefined) {
    props.formData.props = defaultFormProps;
} else {
    props.formData.props = Object.assign(defaultFormProps, props.formData.props);
}



//#region 操作控件

//添加控件
function addControl(ctlType) {
    var control = new ctlType();
    props.formData.controls.push(control);
    data.activeControl = control;
}
//克隆控件
function clone(ctlType) {
    var control = new ctlType();
    return control;
}
//复制控件
function handleCopy(originControl) {
    let control = JSON.parse(JSON.stringify(originControl));
    control.id = randomWord(false, 9);
    control.lock = false;
    props.formData.controls.push(control);
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
//删除控件
function handleDelete(control, index) {
    if (data.activeControl != null && control.id == data.activeControl.id) {
        data.activeControl = null;
    }
    props.formData.controls.splice(index, 1);
}

//清空控件
function clearControl() {

    for (let i = props.formData.controls.length - 1; i >= 0; i--) {
        let control = props.formData.controls[i];
        if (!control.lock) {
            props.formData.controls.splice(i, 1);
            if (control == data.activeControl) {
                data.activeControl = null;
            }
        }
    }

}
//#endregion


//#region 查看formJson
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
// 语法检测 如果是只读，就不需要语法检测了
// import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'; // For vite
// ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);
// :options="{ useWorker: true }"
let formJsonVisible = ref(false);
let formJson = ref(null);
function viewFormJson() {
    formJson.value = getFormJson(true)
    formJsonVisible.value = true;
}
function getFormJson(format) {

    if (format) {
        return JSON.stringify(props.formData, null, 2);
    } else {
        return JSON.stringify(props.formData);
    }
}
//#endregion


//#region 预览表单
import FormRenderer from './FormRenderer.vue';
import { ElMessage } from 'element-plus';
import FormViewer from './FormViewer.vue';
let previewVisible = ref(false);
let formRenderer = ref(null);
let previewData = reactive({
    formData: {},
    formModel: {}
})
function previewFrom() {
    previewData.formData = JSON.parse(JSON.stringify(props.formData));
    let formModel = {};
    previewData.formData.controls.forEach(control => {
        if (control.props.defaultValue !== undefined)
            formModel[control.id] = control.props.defaultValue;
    });
    previewData.formModel = formModel;
    previewVisible.value = true;
}
function validate() {
    formRenderer.value.validate((valid) => {
        if (valid) {
            ElMessage.success('表单验证成功');
        } else {
            ElMessage.error('表单验证失败');
        }

    })
}

function resetFields() {
    formRenderer.value.resetFields();
}

//预览查看model数据
let modelJsonVisible = ref(false);
let modelDescVisible = ref(false);
let modelJson = ref(null);
function viewModelJson() {
    modelJson.value = JSON.stringify(previewData.formModel, null, 2);
    modelJsonVisible.value = true;
}
function viewModelDesc() {
    modelDescVisible.value = true;
}

// #endregion


defineExpose({
    getFormJson,
    clearControl,
});

</script>

<template>
    <el-dialog v-model="formJsonVisible" title="表单结构JSON" width="600px">
        <VAceEditor
            class="aceEditor"
            :readonly="true"
            v-model:value="formJson"
            lang="json"
            theme="chrome"
            style="height: 400px"
        />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="formJsonVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="previewVisible" destroy-on-close center fullscreen title="表单预览">
        <div class="epdf-preview-container">
            <FormRenderer
                ref="formRenderer"
                :formData="previewData.formData"
                :formModel="previewData.formModel"
            />

            <el-dialog v-model="modelJsonVisible" destroy-on-close title="表单数据JSON" width="600px">
                <VAceEditor
                    class="aceEditor"
                    :readonly="true"
                    v-model:value="modelJson"
                    lang="json"
                    theme="chrome"
                    style="height: 400px"
                />
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="modelJsonVisible = false">关闭</el-button>
                    </span>
                </template>
            </el-dialog>

            <el-dialog v-model="modelDescVisible" destroy-on-close title="表单数据展示" width="600px">
                <div style="height: 400px; overflow-y: auto;">
                    <FormViewer
                        :formData="previewData.formData"
                        :formModel="previewData.formModel"
                    />
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="modelDescVisible = false">关闭</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <template #footer>
            <div class="epdf-preview-footer">
                <el-button type="primary" @click="viewModelJson">表单数据</el-button>
                <el-button type="primary" @click="viewModelDesc">表单查看</el-button>
                <el-button type="primary" @click="validate">验证表单</el-button>
                <el-button type="primary" @click="resetFields">重置表单</el-button>
                <el-button type="primary" @click="previewVisible = false">关闭</el-button>
            </div>
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
                <div class="epdf-devices">
                    <el-icon
                        @click="data.device = device"
                        class="icon"
                        :class="{ 'is-selected': data.device == device }"
                        v-for="device in ['pc', 'pad', 'mobile']"
                    >
                        <NameIcon :name="device" />
                    </el-icon>
                </div>

                <div class="epdf-opts">
                    <el-popconfirm
                        confirmButtonText="是"
                        cancelButtonText="否"
                        title="确定要清空组件吗?"
                        @confirm="clearControl"
                    >
                        <template #reference>
                            <el-button type="text" :disabled="formData.controls.length == 0">
                                <el-icon>
                                    <NameIcon name="clear" />
                                </el-icon>
                                <span>清空</span>
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-button type="text" @click="viewFormJson">
                        <el-icon>
                            <NameIcon name="json" />
                        </el-icon>
                        <span>查看JSON</span>
                    </el-button>
                    <el-button
                        type="text"
                        @click="previewFrom"
                        :disabled="formData.controls.length == 0"
                    >
                        <el-icon>
                            <NameIcon name="preview" />
                        </el-icon>
                        <span>预览</span>
                    </el-button>
                    <!-- <el-button type="text" @click="submit">提交？</el-button> -->
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
                    :status-icon="false"
                    :show-message="false"
                >
                    <draggable
                        :list="formData.controls"
                        item-key="id"
                        class="epdf-form-draggable"
                        @change="onChange"
                        :sort="true"
                        :group="{ name: 'com', pull: true, put: true }"
                    >
                        <template #item="{ element, index }">
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
                                        :is="types[element.type].Renderer"
                                        :control="element"
                                    />
                                </el-form-item>
                                <div class="opt">
                                    <el-icon @click.stop="handleCopy(element)">
                                        <NameIcon name="copy"></NameIcon>
                                    </el-icon>
                                    <el-icon
                                        v-if="!element.lock"
                                        @click.stop="handleDelete(element, index)"
                                    >
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
                <el-tab-pane label="组件属性" name="control">
                    <el-empty v-if="data.activeControl == null" description="请选择组件"></el-empty>
                    <component
                        v-else
                        :is="types[data.activeControl.type].PropEditor"
                        :control="data.activeControl"
                        :formProps="formData.props"
                    />
                </el-tab-pane>
                <el-tab-pane label="表单属性" name="form">
                    <FormPropsEditor :formProps="formData.props" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.epdf-preview-container {
    @apply px-3 py-6 w-1/2 -my-8 mx-auto items-center overflow-y-auto border shadow;
    height: 650px;
    min-width: 400px;
}
.epdf-preview-footer {
    @apply text-center;
}

.aceEditor {
    @apply -my-8 border;
}

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
                @apply flex items-center space-x-2 text-lg text-gray-600;
                .is-selected {
                    @apply bg-gray-200 text-blue-500;
                }
                .icon {
                    @apply w-7 h-7 p-0.5 rounded cursor-pointer;
                }
            }
            .epdf-opts {
                @apply flex space-x-5;
            }
        }
        .epdf-form-container {
            @apply box-border p-3 flex-1 overflow-auto;
        }
        .epdf-form {
            @apply flex flex-col min-h-full bg-white;
            .epdf-form-draggable {
                @apply flex flex-grow flex-wrap overflow-y-auto content-start;
            }
        }
        .epdf-form-container.pc {
            width: 100%;
        }
        .epdf-form-container.mobile {
            // width: 375px;
            width: 414px;
        }
        .epdf-form-container.pad {
            width: 770px;
        }

        .epdf-form-item-wrap {
            .opt {
                @apply hidden absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
            }
            @apply relative border border-dashed box-border  p-2  cursor-move;
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
