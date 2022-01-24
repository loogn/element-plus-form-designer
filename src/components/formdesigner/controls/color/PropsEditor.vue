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
function requiredMessageChange(value) {
    props.control.rules[0].message = value;
}
function addOption() {
    props.control.props.options.push({ value: '' });
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
        <!-- <el-form-item label="尺寸">
            <el-radio-group v-model="control.props.size">
                <el-radio-button label="small">小</el-radio-button>
                <el-radio-button label="default">默认</el-radio-button>
                <el-radio-button label="large">大</el-radio-button>
            </el-radio-group>
        </el-form-item> -->

        <el-form-item label="支持透明度">
            <el-switch @change="requiredChange" v-model="control.props.showAlpha"></el-switch>
        </el-form-item>

        <el-form-item label="默认值">
            <el-color-picker
                v-model="control.props.defaultValue"
                :show-alpha="control.props.showAlpha"
            />
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

        <el-divider>预定义颜色</el-divider>

        <el-form-item label-width="0">
            <draggable
                class="grid grid-cols-3 w-full"
                handle=".cursor-move"
                :list="control.props.options"
                item-key="index"
                tag="div"
            >
                <template #item="{ element, index }">
                    <div class="inline-flex items-center">
                        <el-icon class="text-lg cursor-move">
                            <NameIcon name="move" />
                        </el-icon>
                        <el-color-picker
                            v-model="element.value"
                            :show-alpha="control.props.showAlpha"
                        />
                        <el-icon
                            class="text-lg cursor-pointer text-red-500"
                            @click="removeOption(index)"
                        >
                            <NameIcon name="delete" />
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
