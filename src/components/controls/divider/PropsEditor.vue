<script setup>
let props = defineProps({
    control: Object,
    formProps: Object,
})

</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="显示文本">
            <el-input v-model="control.props.content" placeholder="请输入显示文本"></el-input>
        </el-form-item>
        <el-form-item label="样式">
            <el-select v-model="control.props.borderStyle" placeholder>
                <el-option label="实线" value="solid"></el-option>
                <el-option label="点状" value="dotted"></el-option>
                <el-option label="虚线" value="dashed"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="位置">
            <el-radio-group v-model="control.props.contentPosition">
                <el-radio-button label="left">左侧</el-radio-button>
                <el-radio-button label="center">居中</el-radio-button>
                <el-radio-button label="right">右侧</el-radio-button>
            </el-radio-group>
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

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
