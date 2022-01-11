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
function typeChange(value) {

    let format = "yyyy-MM-dd";
    switch (value) {
        case "year":
            format = "YYYY"
            break;
        case "month":
            format = "YYYY-MM"
            break;
        case "date":
            format = "YYYY-MM-DD"
            break;
        case "datetime":
            format = "YYYY-MM-DD HH:mm:ss"
            break;
        case "week":
            format = "YYYY 第 ww 周";
            break;
        default:
            break;
    }
    props.control.props.format = format;
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
            <el-date-picker
                :type="control.props.type"
                v-model="control.props.defaultValue"
                placeholder="请选择默认值"
                :clearable="control.props.clearable"
                :value-format="control.props.format"
                :format="control.props.format"
            ></el-date-picker>
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
        <el-form-item label="类型">
            <el-select v-model="control.props.type" @change="typeChange">
                <el-option value="date" label="日期"></el-option>
                <el-option value="datetime" label="日期时间"></el-option>
                <el-option value="week" label="周"></el-option>
                <el-option value="month" label="月"></el-option>
                <el-option value="year" label="年"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="格式">
            <el-input v-model="control.props.format" placeholder="请输入格式"></el-input>
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

        <el-form-item label="是否可手输">
            <el-switch v-model="control.props.editable"></el-switch>
        </el-form-item>
        <el-form-item label="是否可清空">
            <el-switch v-model="control.props.clearable"></el-switch>
        </el-form-item>
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
