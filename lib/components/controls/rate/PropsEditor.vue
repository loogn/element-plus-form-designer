<script setup>
let props = defineProps({
    control: Object,
    formProps: Object,
})
function requiredChange(value) {
    props.control.rules[0].required = value;
    props.control.rules[1].min = value ? 0.00001 : 0;
}
function requiredMessageChange(value) {
    props.control.rules[0].message = value;
    props.control.rules[1].message = value;
}
function patternChange(value) {
    if (value) {
        props.control.rules[1].pattern = eval(value);
    }
}

function patternMessageChange(value) {
    props.control.rules[1].message = value;
}
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input-number v-model="control.props.defaultValue" :min="0" />
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

        <el-form-item label="最大分值">
            <el-input-number v-model="control.props.max" :min="0" />
        </el-form-item>
        <el-form-item label="允许半选">
            <el-switch v-model="control.props.allowHalf"></el-switch>
        </el-form-item>

        <el-form-item label="显示分数">
            <el-switch v-model="control.props.showScore"></el-switch>
        </el-form-item>

        <el-form-item label="是否必填">
            <el-switch @change="requiredChange" v-model="control.props.required"></el-switch>
        </el-form-item>
        <el-form-item label="必填提示" v-if="control.props.required">
            <el-input @change="requiredMessageChange" v-model="control.props.requiredMessage"></el-input>
        </el-form-item>

        <el-form-item label="是否只读">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
