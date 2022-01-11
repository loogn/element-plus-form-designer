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
        <el-form-item label="占位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
            <el-switch
                v-model="control.props.defaultValue"
                :inline-prompt="true"
                active-text="开"
                inactive-text="关"
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

        <el-form-item label="显示标题">
            <el-switch v-model="control.props.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>

        <el-form-item label="开状态文字">
            <el-input v-model="control.props.activeText"></el-input>
        </el-form-item>
        <el-form-item label="关状态文字">
            <el-input v-model="control.props.inactiveText"></el-input>
        </el-form-item>
        <el-form-item label="嵌入文字">
            <el-switch v-model="control.props.inlinePrompt"></el-switch>
        </el-form-item>
        <el-form-item label="开状态颜色">
            <el-color-picker v-model="control.props.activeColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="关状态颜色">
            <el-color-picker v-model="control.props.inactiveColor"></el-color-picker>
        </el-form-item>

        <el-form-item label="是否必填">
            <el-switch @change="requiredChange" v-model="control.props.required"></el-switch>
        </el-form-item>

        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
