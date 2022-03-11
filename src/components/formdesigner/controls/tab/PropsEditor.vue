<script setup>
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
function patternChange(value) {
    if (value) {
        props.control.rules[1].pattern = eval(value);
    }
}

function patternMessageChange(value) {
    props.control.rules[1].message = value;
}

// 多选固定选项删除
const delSelectOption = (index, type) => {
    props.control.props.columns.splice(index, 1)
}
// 多选固定选项增加
const addSelectOption = (type) => {
    props.control.props.columns.push({
        label: '标签名称',
        controls: []
    })
}
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
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
        <h3>标签配置项</h3>
        <el-form-item v-for="(item, index) in props.control.props.columns" :key="item.label">
            <el-col :span="12">
                <el-input placeholder="标签配置项" v-model="item.label"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
                <i class="icon-del" @click="delSelectOption(index, 'tabs')"></i>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button @click="addSelectOption('tabs')">增加标签</el-button>
        </el-form-item>
        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
