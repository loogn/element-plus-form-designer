<script setup>
import draggable from 'vuedraggable/src/vuedraggable';
import NameIcon from '../../NameIcon.vue';
let props = defineProps({
    control: Object,
    formProps: Object,
})
function requiredChange(value) {
    props.control.rules[0].required = value;
}
function addOption() {
    props.control.props.columns.push({ name: '' });
}
function removeOption(index) {
    props.control.props.columns.splice(index, 1)
}
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 
        <el-form-item label="默认值">
            <el-input-number
                v-model="control.props.defaultValue"
                placeholder="请输入默认值"
            />
        </el-form-item>-->

        <el-form-item label="宽度">
            <el-slider
                class="w-11/12"
                :min="0"
                :max="formProps.cols"
                show-stops
                v-model="control.props.width"
            ></el-slider>
        </el-form-item>

        <el-form-item label="默认行数">
            <el-input-number
                v-model="control.props.defaultRows"
                :max="control.props.maxRows"
                :min="0"
            />
        </el-form-item>
        <el-form-item label="最大行数">
            <el-input-number v-model="control.props.maxRows" :min="0" />
        </el-form-item>

        <el-form-item label="可添加">
            <el-switch v-model="control.props.addable"></el-switch>
        </el-form-item>
        <el-form-item label="可复制">
            <el-switch v-model="control.props.cloneable"></el-switch>
        </el-form-item>
        <el-form-item label="可删除">
            <el-switch v-model="control.props.deleteable"></el-switch>
        </el-form-item>
        <el-form-item label="显示边框">
            <el-switch v-model="control.props.border"></el-switch>
        </el-form-item>
        <el-form-item label="斑马纹">
            <el-switch v-model="control.props.stripe"></el-switch>
        </el-form-item>

        <el-form-item label="最大高度">
            <el-input-number :step="50" v-model="control.props.maxHeight" />
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
        <el-divider>列定义</el-divider>
        <!-- <el-form-item label="自定义文本" class="mb-0 -mt-2">
            <el-switch v-model="control.props.showOptionLabel"></el-switch>
        </el-form-item>-->
        <el-form-item label-width="0">
            <draggable
                class="space-y-1 w-full"
                handle=".cursor-move"
                :list="control.props.columns"
                item-key="index"
                tag="div"
            >
                <template #item="{ element, index }">
                    <div class="flex items-center">
                        <el-icon class="text-lg cursor-move">
                            <NameIcon name="move" />
                        </el-icon>
                        <el-input class="flex-grow" placeholder="列名" v-model="element.name"></el-input>
                        <el-icon
                            class="text-lg cursor-pointer text-red-500"
                            @click="removeOption(index)"
                        >
                            <NameIcon name="delete" />
                        </el-icon>
                    </div>
                </template>
            </draggable>
            <el-button text type="primary" @click="addOption">
                <el-icon>
                    <NameIcon name="plus" />
                </el-icon>添加
            </el-button>
        </el-form-item>
    </el-form>
</template>
