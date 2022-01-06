<script setup>

let props = defineProps({
    formProps: Object
})
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题位置">
            <el-select v-model="formProps.labelPosition">
                <el-option label="上方" value="top"></el-option>
                <el-option label="靠左" value="left"></el-option>
                <el-option label="靠右" value="right"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="formProps.labelWidth" :step="5" :min="0" />
        </el-form-item>

        <el-form-item label="表单尺寸">
            <el-select v-model="formProps.size">
                <el-option label="小" value="small"></el-option>
                <el-option label="正常" value="default"></el-option>
                <el-option label="大" value="large"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="栅格列数">
            <el-slider class="w-11/12" :min="1" :max="24" show-stops v-model="formProps.cols"></el-slider>
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="formProps.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
