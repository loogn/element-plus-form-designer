<script setup>
import ItemViewerGroup from '../ItemViewerGroup.vue'

defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <div>{{ model[control.id] }}</div>
    <el-tabs v-if="model">
        <el-tab-pane
            v-for="(item, index) in control.props.columns"
            :label="item.label"
            :key="index"
        >
            <ItemViewerGroup :controls="item.controls" :formModel="model"></ItemViewerGroup>
        </el-tab-pane>
    </el-tabs>
</template>