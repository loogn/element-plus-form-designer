<script setup>
import draggable from 'vuedraggable';
import NameIcon from '../../NameIcon.vue';
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
function addOption() {
    props.control.props.options.push({ label: '', text: '' });
}
function removeOption(index) {
    props.control.props.options.splice(index, 1)
}
</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input v-model="control.props.defaultValue" placeholder="请输入默认值"></el-input>
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

        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>

        <el-form-item label="是否必填">
            <el-switch @change="requiredChange" v-model="control.props.required"></el-switch>
        </el-form-item>
        <el-form-item label="必填提示" v-if="control.props.required">
            <el-input @change="requiredMessageChange" v-model="control.props.requiredMessage"></el-input>
        </el-form-item>

        <el-form-item label="是否禁用">
            <el-switch v-model="control.props.disabled"></el-switch>
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
        <el-divider>选项</el-divider>
        <el-form-item label="自定义文本"  class="mb-0 -mt-4">
            <el-switch v-model="control.props.showOptionLabel"></el-switch>
        </el-form-item>
        <el-form-item label-width="0">
            <draggable
                class="space-y-1 w-full"
                handle=".cursor-move"
                :list="control.props.options"
                item-key="index"
                tag="div"
            >
                <template #item="{ element, index }">
                    <div class="flex items-center">
                        <el-icon class="text-lg cursor-move">
                            <NameIcon name="rank" />
                        </el-icon>
                        <el-input class="flex-grow" placeholder="选项值" v-model="element.label"></el-input>
                        <el-input
                            class="flex-grow"
                            v-if="control.props.showOptionLabel"
                            placeholder="显示文本"
                            v-model="element.text"
                        ></el-input>
                        <el-icon
                            class="text-lg cursor-pointer text-red-500"
                            @click="removeOption(index)"
                        >
                            <NameIcon name="remove" />
                        </el-icon>
                    </div>
                </template>
            </draggable>
            <el-button type="text" @click="addOption">
                <el-icon>
                    <NameIcon name="plus" />
                </el-icon>添加
            </el-button>
        </el-form-item>
    </el-form>
</template>
