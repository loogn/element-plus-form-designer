<script setup>
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
            v-for="(col, index) in control.props.columns"
        >
            <template #default="scope">
                <span>{{ scope.row[col.name] }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>