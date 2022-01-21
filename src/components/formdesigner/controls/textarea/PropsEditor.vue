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
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="占位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input v-model="control.props.defaultValue" placeholder="请输入默认值"></el-input>
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
        <el-form-item label="行数">
            <el-input-number v-model="control.props.rows" :min="2" />
        </el-form-item>
        <el-form-item label="自适应高">
            <el-switch v-model="control.props.autosize"></el-switch>
        </el-form-item>

        <el-form-item label="字数统计">
            <el-switch v-model="control.props.showWordLimit"></el-switch>
        </el-form-item>
        <el-form-item label="最大长度" v-if="control.props.showWordLimit">
            <el-input-number v-model="control.props.maxlength" :min="1" />
        </el-form-item>
        <el-form-item label="显示标题">
            <el-switch v-model="control.props.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>

        <el-form-item label="是否必填">
            <el-switch @change="requiredChange" v-model="control.props.required"></el-switch>
        </el-form-item>
        <el-form-item label="必填提示" v-if="control.props.required">
            <el-input @change="requiredMessageChange" v-model="control.props.requiredMessage"></el-input>
        </el-form-item>
        <el-form-item label="正则验证">
            <el-input @change="patternChange" v-model="control.props.pattern"></el-input>
        </el-form-item>
        <el-form-item label="正则提示" v-if="control.props.pattern">
            <el-input @change="patternMessageChange" v-model="control.props.patternMessage"></el-input>
        </el-form-item>

        <!-- <el-form-item label="是否可清空">
            <el-switch v-model="control.props.clearable"></el-switch>
        </el-form-item>-->
        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="是否只读">
            <el-switch v-model="control.props.readonly"></el-switch>
        </el-form-item>
        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
