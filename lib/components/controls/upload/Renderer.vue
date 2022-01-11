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
    fileList: []
})

if (props.model) {
    data.fileList = filesToList(props.model[props.control.id]);
}

function handleUploadSuccess(res, file, fileList) {

    let fileInfo = uploadOptions.getFileHook(res, file, fileList);
    if (fileInfo.url) {
        data.fileList.push(fileInfo);
        if (props.model) {
            props.model[props.control.id] = data.fileList.map(x => x.url).join();
        }
    } else {
        ElMessage.error(fileInfo);
    }
}
function handleRemove(file, fileList) {
    data.fileList = fileList;
    if (props.model) {
        props.model[props.control.id] = data.fileList.map(x => x.url).join();
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

function filesToList(files) {
    if (files) {
        // console.log(files);
        return files.split(",").filter(x => x).map((x) => {
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
    >
        <el-button
            type="primary"
            :disabled="control.props.disabled || control.props.limit <= data.fileList.length"
        >
            <el-icon>
                <NameIcon name="upload" />
            </el-icon>
            <span>{{ control.props.buttonText }}</span>
        </el-button>
        <template v-if="control.props.tip" #tip>
            <div class="el-upload__tip">{{ control.props.tip }}</div>
        </template>
    </el-upload>
</template>
