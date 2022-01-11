<script setup>
let props = defineProps({
    control: Object,
    formProps: Object,
})

</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="样式">
            <el-select v-model="control.props.type" placeholder>
                <el-option label="默认" value="default"></el-option>
                <el-option label="主要" value="primary"></el-option>
                <el-option label="成功" value="success"></el-option>
                <el-option label="警告" value="warning"></el-option>
                <el-option label="危险" value="danger"></el-option>
                <el-option label="信息" value="info"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示文本">
            <el-input v-model="control.props.content" placeholder="请输入显示文本"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
            <el-input v-model="control.props.href" placeholder="请输入链接地址"></el-input>
        </el-form-item>

        <el-form-item label="下划线">
            <el-switch v-model="control.props.underline"></el-switch>
        </el-form-item>

        <el-form-item label="新页面打开">
            <el-switch active-value="_blank" inactive-value="_self" v-model="control.props.target"></el-switch>
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
        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
