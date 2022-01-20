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
    <div>
        <el-link v-for="item in fileList" :href="item.url" target="_blank">{{ item.name }}</el-link>
    </div>
</template>