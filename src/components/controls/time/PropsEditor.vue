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
            <el-time-select
                v-model="control.props.defaultValue"
                :start="control.props.start"
                :step="control.props.step"
                :end="control.props.end"
                placeholder="请选择默认值"
            ></el-time-select>
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

        <el-form-item label="开始时间">
            <el-time-select
                v-model="control.props.start"
                start="00:00"
                :step="control.props.step"
                end="23:59"
                placeholder="请选择开始时间"
            ></el-time-select>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-time-select
                v-model="control.props.end"
                start="00:00"
                :step="control.props.step"
                end="23:59"
                placeholder="请选择结束时间"
            ></el-time-select>
        </el-form-item>
        <el-form-item label="间隔时间">
            <el-time-select
                v-model="control.props.step"
                start="00:00"
                step="00:05"
                end="02:00"
                placeholder="请选择间隔时间"
            ></el-time-select>
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

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
