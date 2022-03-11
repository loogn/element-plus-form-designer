<script setup>
import ItemDesignerGroup from '../ItemDesignerGroup.vue'
import ItemRendererGroup from '../ItemRendererGroup.vue'

defineProps({
    control: Object,
    model: Object,
});
</script>

<template>
    <div class="form-tabs" cols="12">
        <el-tabs v-if="model">
            <el-tab-pane
                v-for="(item, index) in control.props.columns"
                :label="item.label"
                :key="index"
            >
                <ItemRendererGroup :controls="item.controls" :formModel="model"></ItemRendererGroup>
            </el-tab-pane>
        </el-tabs>
        <el-tabs v-else>
            <el-tab-pane
                v-for="(item, index) in control.props.columns"
                :label="item.label"
                :key="index"
            >
                <ItemDesignerGroup :controls="item.controls"></ItemDesignerGroup>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style  lang="scss" scoped>
.form-tabs {
    .epdf-form-draggable {
        min-height: 80px;
    }
}
</style>