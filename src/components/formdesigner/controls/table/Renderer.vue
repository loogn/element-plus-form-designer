<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { randomWord, stringifyJson, parseJson } from "./../../utils";

let props = defineProps({
    control: Object,
    model: Object,
})
let data = reactive({
    list: []
})

//默认行数

if (props.model) {
    if (props.model[props.control.id] == undefined) {
        props.model[props.control.id] = [];
    }
}
function initRows(m) {
    for (let i = 0; i < props.control.props.defaultRows; i++) {
        let row = {};
        props.control.props.columns.forEach(col => {
            row[col.name] = '';
        });
        m.push(row);
    }
}
let thisModel = props.model ? props.model[props.control.id] : data.list;
console.log(thisModel);
initRows(thisModel);

function canAdd() {
    if (props.control.props.maxRows > 0) {
        if (thisModel.length >= props.control.props.maxRows) {
            ElMessage.error("已达到最大行数：" + props.control.props.maxRows);
            return false;
        }
    }
    return true;
}
function addRow() {
    if (!canAdd()) {
        return;
    }
    let row = {};
    props.control.props.columns.forEach(col => {
        row[col.name] = '';
    });
    thisModel.push(row);
}
function delRow(scp) {
    thisModel.splice(scp.$index, 1)
}
function copyRow(scp) {
    if (!canAdd()) {
        return;
    }
    let row = parseJson(stringifyJson(scp.row));
    thisModel.push(row);
}

</script>

<template>
    <el-table
        empty-text="请添加数据"
        :data="thisModel"
        :stripe="control.props.stripe"
        :border="control.props.border"
        :max-height="control.props.maxHeight"
        style="width: 100%;"
    >
        <el-table-column
            :label="col.name"
            :key="index"
            v-for="(col,index) in control.props.columns"
        >
            <template #default="scope">
                <el-input
                    :disabled="control.props.disabled"
                    v-model="scope.row[col.name]"
                    placeholder
                ></el-input>
            </template>
        </el-table-column>
        <el-table-column
            v-if="control.props.cloneable || control.props.deleteable"
            label="操作"
            fixed="right"
            width="120"
        >
            <template #default="scope">
                <el-button
                    v-if="control.props.cloneable"
                    :disabled="control.props.disabled"
                    @click="copyRow(scope)"
                    type="text"
                >复制</el-button>
                <el-button
                    v-if="control.props.deleteable"
                    :disabled="control.props.disabled"
                    @click="delRow(scope)"
                    type="text"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div v-if="control.props.addable">
        <el-button type="text" :disabled="control.props.disabled" @click="addRow">添加</el-button>
    </div>
</template>