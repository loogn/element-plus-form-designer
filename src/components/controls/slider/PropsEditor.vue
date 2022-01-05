<script setup>
let props = defineProps({
    control: Object,
    formProps: Object,
})
function requiredChange(value) {
    props.control.rules[0].required = value;
}
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="默认值">
            <el-input-number
                :min="control.props.min"
                :max="control.props.max"
                :step="control.props.step"
                v-model="control.props.defaultValue"
                placeholder="请输入默认值"
            />
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

        <el-form-item label="最小值">
            <el-input-number v-model="control.props.min" />
        </el-form-item>
        <el-form-item label="最大值">
            <el-input-number v-model="control.props.max" />
        </el-form-item>
        <el-form-item label="步长">
            <el-input-number v-model="control.props.step" />
        </el-form-item>
        <el-form-item label="显示输入">
            <el-switch v-model="control.props.showInput"></el-switch>
        </el-form-item>
        <el-form-item label="显示间断点">
            <el-switch v-model="control.props.showStops"></el-switch>
        </el-form-item>
        <el-form-item label="显示提示">
            <el-switch v-model="control.props.showTooltip"></el-switch>
        </el-form-item>

        <el-form-item label="显示标题">
            <el-switch v-model="control.props.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>
        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
