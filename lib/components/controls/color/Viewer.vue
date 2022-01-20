<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <!-- <div>{{ model[control.id] }} </div> -->

    <el-color-picker
        v-model="model[control.id]"
        :show-alpha="control.props.showAlpha"
        disabled
        :predefine="control.props.options.map(x => x.value)"
    />
</template>