<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-rate  style="line-height:normal"
        v-if="model"
        v-model="model[control.id]"
        :disabled="control.props.disabled"
        :show-score="control.props.showScore"
        :allow-half="control.props.allowHalf"
        :max="control.props.max"
    ></el-rate>
    <el-rate style="line-height:normal"
        v-else
        v-model="control.props.defaultValue"
        :disabled="control.props.disabled"
        :show-score="control.props.showScore"
        :allow-half="control.props.allowHalf"
        :max="control.props.max"
    ></el-rate>
</template>
