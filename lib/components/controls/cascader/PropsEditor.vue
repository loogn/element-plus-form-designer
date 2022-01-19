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


//#region 编辑选项

let formJsonVisible = ref(false);
let treeData = ref(null);
function viewFormJson() {
    treeData.value = JSON.parse(JSON.stringify(props.control.props.options));
    formJsonVisible.value = true;
}
let id = 1;
function append(data) {
    if (data == null)
        data = treeData.value;
    const newChild = { value: '新节点' + id++, $edit: true }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
}
function appendRoot() {
    const newChild = { value: '新节点' + id++, $edit: true }
    treeData.value.push(newChild);
}

function remove(node, data) {
    const parent = node.parent;
    const children = parent.data.children || parent.data
    const index = children.findIndex((d) => d.value === data.value)
    children.splice(index, 1)
}
function Sure() {
    try {
        props.control.props.options = JSON.parse(JSON.stringify(treeData.value, ['value', 'children']));
        formJsonVisible.value = false;
    }
    catch (e) {
        ElMessage.error("语法错误");
    }
}
//#endregion
function onOver(e) {
    e.target.focus();
}
</script>

<template>
    <el-dialog center v-model="formJsonVisible" title="编辑选项" width="600px">
        <el-tree :data="treeData" default-expand-all :expand-on-click-node="false">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span style="flex-grow: 1; margin-right: 15px;" @click="node.data.$edit = true">
                        <el-input
                            size="small"
                            v-if="node.data.$edit"
                            @blur="node.data.$edit = false"
                            v-model="node.data.value"
                            @mouseover="onOver"
                            placeholder
                        />
                        <span v-else>{{ node.data.value }}</span>
                    </span>
                    <span>
                        <el-button type="text" @click="append(data)">添加</el-button>
                        <el-button type="text" @click="remove(node, data)">删除</el-button>
                    </span>
                </span>
            </template>
        </el-tree>
        <el-button type="text" @click="appendRoot">添加根节点</el-button>
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
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
}
</style>