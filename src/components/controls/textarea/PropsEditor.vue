<script setup>
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object
})

</script>

<template>
    <el-form label-width="100px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="展位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>
    </el-form>
</template>
