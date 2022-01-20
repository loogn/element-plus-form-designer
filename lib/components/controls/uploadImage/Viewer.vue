<script setup>
defineProps({
    control: Object,
    model: Object,
})
</script>

<template>
    <div class="filewraper">
        <el-image
            :preview-src-list="model[control.id]"
            :initial-index="index"
            v-for="(url,index) in model[control.id]"
            style="width: 100px; height: 100px"
            :src="url"
        ></el-image>
    </div>
</template>

<style scoped lang="scss">
.filewraper {
    @apply space-x-2;
}
</style>