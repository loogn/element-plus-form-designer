<script setup>
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object
})

</script>

<template>
    <div class="w-full epdf-form-item-wrap">
        <ElFormItem :label-width="150" :label="control.props.label">
            <el-input v-model="control.props.defaultValue" :placeholder="control.props.placeholder"></el-input>
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
