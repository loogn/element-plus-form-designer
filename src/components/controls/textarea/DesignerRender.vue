<script setup>
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object
})
let emits = defineEmits(['selected']);
function handleClick() {

    emits("selected", props.control);
}
</script>

<template>
    <div @click="handleClick" class="w-full epdf-form-item-wrap">
        <ElFormItem :label-width="150" :label="control.props.label">
            <el-input type="textarea" v-model="control.props.defaultValue" :placeholder="control.props.placeholder"></el-input>
        </ElFormItem>
        <div class="opt">
            <el-icon>
                <NameIcon name="CopyDocument"></NameIcon>
            </el-icon>
            <el-icon>
                <NameIcon name="Delete"></NameIcon>
            </el-icon>
        </div>
    </div>
</template>
