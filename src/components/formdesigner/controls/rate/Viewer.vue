<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <el-rate style="line-height:normal"
        v-model="model[control.id]"
        :disabled="true"
        :show-score="control.props.showScore"
        :allow-half="control.props.allowHalf"
        :max="control.props.max"
    ></el-rate>
</template>
