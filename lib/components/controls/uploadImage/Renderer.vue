<script setup>
import { inject, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import NameIcon from "../../NameIcon.vue";
let props = defineProps({
    control: Object,
    model: Object,
})
let uploadOptions = inject('uploadOptions');
let header = uploadOptions.getHeaders();
let data = reactive({
    fileList: [],
    previewVisible: false,
    previewUrl: "",
})

if (props.model) {
    data.fileList = filesToList(props.model[props.control.id]);
}

function handleUploadSuccess(res, file, fileList) {

    let fileInfo = uploadOptions.getFileHook(res, file, fileList);
    if (fileInfo.url) {
        data.fileList.push(fileInfo);
        if (props.model) {
            props.model[props.control.id] = data.fileList.map(x => x.url);
        }
    } else {
        ElMessage.error(fileInfo);
    }
}
function handleRemove(file, fileList) {
    data.fileList = fileList;
    if (props.model) {
        props.model[props.control.id] = data.fileList.map(x => x.url);
    }
}
function handleExceed(file, fileList) {
    ElMessage.error("最多可以上传" + props.control.props.limit + "个文件");
}
function beforeUpload(file) {
    if (props.control.props.size > 0) {
        let maxSize = props.control.props.size;
        if (props.control.props.sizeUnit == 'KB') {
            maxSize = 1024 * maxSize;
        } else if (props.control.props.sizeUnit == 'MB') {
            maxSize = 1024 * 1024 * maxSize;
        } else if (props.control.props.sizeUnit == 'GB') {
            maxSize = 1024 * 1024 * 1024 * maxSize;
        }
        if (file.size > maxSize) {
            ElMessage.error("最大可以上传" + props.control.props.size + props.control.props.sizeUnit + "的文件");
            return false;
        }
    }
    return true;
}
function handlePictureCardPreview(file) {
    data.previewUrl = file.url;
    data.previewVisible = true;
}

function filesToList(files) {
    if (files) {
        // console.log(files);
        return files.filter(x => x).map((x) => {
            return {
                name: x.substr(x.lastIndexOf('/') + 1),
                url: x
            }
        });
    }
    return [];
}


</script>

<template>
    <el-upload
        class="avatar-uploader"
        list-type="picture-card"
        :action="uploadOptions.action"
        :headers="header"
        :multiple="control.props.multiple"
        :limit="control.props.limit"
        :show-file-list="control.props.showFileList"
        :file-list="data.fileList"
        :accept="control.props.accept"
        :disabled="control.props.disabled"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
    >
        <el-icon>
            <NameIcon name="plus" v-if="control.props.limit > data.fileList.length" />
            <NameIcon name="forbid" v-else />
        </el-icon>

        <template v-if="control.props.tip" #tip>
            <div class="el-upload__tip">{{ control.props.tip }}</div>
        </template>
    </el-upload>
    <el-dialog v-model="data.previewVisible">
        <img :src="data.previewUrl" alt />
    </el-dialog>
</template>

<style scoped lang="scss">
.avatar-uploader {
    :deep(.el-upload-list__item),
    :deep(.el-upload--picture-card) {
        width: 100px;
        height: 100px;
    }
    :deep(.el-upload--picture-card i) {
        margin-top: 35px;
    }
}
</style>