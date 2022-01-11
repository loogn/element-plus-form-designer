<script setup>
import { ref, toRaw } from 'vue';
let props = defineProps({
    control: Object,
    formProps: Object,
})
function requiredChange(value) {
    props.control.rules[0].required = value;

}
function requiredMessageChange(value) {
    props.control.rules[0].message = value;
}


//#region 查看formJson
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
// 语法检测 如果是只读，就不需要语法检测了
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'; // For vite
import { ElMessage } from 'element-plus';
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);

let formJsonVisible = ref(false);
let formJson = ref(null);
let aceEditor = ref(null);
function viewFormJson() {
    formJson.value = JSON.stringify(toRaw(props.control.props.options), null, 2);
    formJsonVisible.value = true;
}
function Sure() {
    try {
        props.control.props.options = JSON.parse(formJson.value);
        formJsonVisible.value = false;
    }
    catch (e) {
        ElMessage.error("语法错误");
    }
}
//#endregion

</script>

<template>
    <el-dialog center v-model="formJsonVisible" title="编辑选项" width="600px">
        <VAceEditor
            ref="aceEditor"
            class="aceEditor"
            v-model:value="formJson"
            lang="json"
            theme="chrome"
            style="height: 400px"
            :options="{ useWorker: true }"
        />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="Sure">确定</el-button>
                <el-button @click="formJsonVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>

    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="占位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>

        <el-form-item label="宽度">
            <el-slider
                class="w-11/12"
                :min="0"
                :max="formProps.cols"
                show-stops
                v-model="control.props.width"
            ></el-slider>
        </el-form-item>
        <el-form-item label="显示标题">
            <el-switch v-model="control.props.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>
        <el-form-item label="选项">
            <el-button type="primary" @click="viewFormJson">编辑选项</el-button>
        </el-form-item>
        <el-form-item label="默认值">
            <el-cascader
                v-model="control.props.defaultValue"
                placeholder="请选择默认值"
                :show-all-levels="control.props.showAllLevels"
                :clearable="control.props.clearable"
                :filterable="control.props.filterable"
                :props="{
                    expandTrigger: control.props.expandTrigger,
                    multiple: control.props.multiple,
                    checkStrictly: control.props.checkStrictly,
                    emitPath: control.props.emitPath,
                    label: 'value'
                }"
                :options="control.props.options"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="是否必填">
            <el-switch @change="requiredChange" v-model="control.props.required"></el-switch>
        </el-form-item>
        <el-form-item label="必填提示" v-if="control.props.required">
            <el-input @change="requiredMessageChange" v-model="control.props.requiredMessage"></el-input>
        </el-form-item>

        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="是否可清空">
            <el-switch v-model="control.props.clearable"></el-switch>
        </el-form-item>
        <el-form-item label="是否可筛选">
            <el-switch v-model="control.props.filterable"></el-switch>
        </el-form-item>

        <el-form-item label="显示全路径">
            <el-switch v-model="control.props.showAllLevels"></el-switch>
        </el-form-item>

        <!-- <el-form-item label="取值">
            <el-radio-group v-model="control.props.valueField">
                <el-radio-button label="label">Label</el-radio-button>
                <el-radio-button label="value">Value</el-radio-button>
            </el-radio-group>
        </el-form-item>-->
        <el-form-item label="展开方式">
            <el-radio-group v-model="control.props.expandTrigger">
                <el-radio-button label="click">点击</el-radio-button>
                <el-radio-button label="hover">悬浮</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.aceEditor {
    @apply -my-8 border;
}
</style>