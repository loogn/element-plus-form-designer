<script setup>
let props= defineProps({
    control: Object,
    model: Object,
})

function filesToList(files) {
    if (files) {
        return files.filter(x => x).map((x) => {
            return {
                name: x.substr(x.lastIndexOf('/') + 1),
                url: x
            }
        });
    }
    return [];
}
let fileList = filesToList(props.model[props.control.id]);
</script>

<template>
    <div class="filewraper">
        <el-link v-for="item in fileList" type="primary" :href="item.url" target="_blank">{{ item.name }}</el-link>
    </div>
</template>
<style scoped lang="scss">
.filewraper{
    @apply space-x-2;
}
</style>