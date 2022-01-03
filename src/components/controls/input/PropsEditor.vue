<script setup>
import { inject } from "vue";
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object
})
let fdprops = inject('fdprops');

</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="展位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input v-model="control.props.defaultValue" placeholder="请输入默认值"></el-input>
        </el-form-item>

        <el-form-item label="宽度">
            <el-slider
                class="w-11/12"
                :min="0"
                :max="fdprops.gridCols"
                show-stops
                v-model="control.props.width"
            ></el-slider>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="control.props.type">
                <el-option value="text" label="文本"></el-option>
                <el-option value="password" label="密码"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="显示密码" v-if="control.props.type == 'password'">
            <el-switch v-model="control.props.showPassword"></el-switch>
        </el-form-item>

        <el-form-item label="字数统计" v-if="control.props.type == 'text'">
            <el-switch v-model="control.props.showWordLimit"></el-switch>
        </el-form-item>

        <el-form-item label="是否必填">
            <el-switch v-model="control.props.required"></el-switch>
        </el-form-item>
        <el-form-item label="必填提示信息" v-if="control.props.required">
            <el-input v-model="control.props.requiredMessage"></el-input>
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
        <!-- required: false,
        requiredMessage: '',-->
    </el-form>
</template>
