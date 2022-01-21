<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-rate
        v-if="model"
        v-model="model[control.id]"
        :disabled="control.props.disabled"
        :show-score="control.props.showScore"
        :allow-half="control.props.allowHalf"
        :max="control.props.max"
    ></el-rate>
    <el-rate
        v-else
        v-model="control.props.defaultValue"
        :disabled="control.props.disabled"
        :show-score="control.props.showScore"
        :allow-half="control.props.allowHalf"
        :max="control.props.max"
    ></el-rate>
</template>
