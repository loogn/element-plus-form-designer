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
            <el-input v-model="control.props.label" clearable placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="占位提示">
            <el-input v-model="control.props.placeholder" placeholder="请输入占位提示"></el-input>
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

        <el-form-item label="高度">
            <el-input-number v-model="control.props.height" :min="100" />
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

        <el-form-item label="图片类型">
            <el-input
                type="textarea"
                v-model="control.props.accept"
                clearable
                placeholder="请输入文件后缀，以英文逗号隔开"
            ></el-input>
        </el-form-item>
        <el-form-item label="图片大小">
            <el-input type="number" :min="0" v-model="control.props.size" placeholder="文件大小,0为不限">
                <template #append>
                    <el-select style="width: 70px" v-model="control.props.sizeUnit" placeholder>
                        <el-option value="KB"></el-option>
                        <el-option value="MB"></el-option>
                        <el-option value="GB"></el-option>
                    </el-select>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item label="跨域Cookie">
            <el-switch v-model="control.props.withCredentials"></el-switch>
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
