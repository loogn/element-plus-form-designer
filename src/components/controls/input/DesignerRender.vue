<script setup>
import { rule } from "postcss";
import { inject, onMounted } from "vue";
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object
})
let emits = defineEmits(['selected']);
function handleClick() {

    emits("selected", props.control);
}
let fdprops = inject('fdprops');
let rules = inject('rules');

onMounted(() => {
    rules[props.control.id] = [];

});
</script>

<template>
    <div
        @click="handleClick"
        class="w-1/3 epdf-form-item-wrap"
        :style="{ 'width': (control.props.width * 100 / fdprops.gridCols) + '%' }"
    >
        <ElFormItem :prop="control.props.id" :label-width="150" :label="control.props.label">
            <el-input
                :type="control.props.type"
                :show-password="control.props.showPassword"
                :show-word-limit="control.props.showWordLimit"
                v-model="control.props.defaultValue"
                :placeholder="control.props.placeholder"
            ></el-input>
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
