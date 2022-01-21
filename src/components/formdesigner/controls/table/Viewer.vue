<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

let props = defineProps({
    control: Object,
    model: Object,
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
    let row = JSON.parse(JSON.stringify(scp.row));
    thisModel.push(row);
}

</script>

<template>
    <el-table
        empty-text="请添加数据"
        :data="props.model[props.control.id]"
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
                <span>{{ scope.row[col.name] }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>