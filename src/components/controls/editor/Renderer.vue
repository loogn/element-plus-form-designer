<script setup>
import { inject, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import E from "wangeditor";
import { ElMessage } from 'element-plus';
let props = defineProps({
    control: Object,
    model: Object,
})
let uploadOptions = inject('uploadOptions');


const editorEle = ref(null);
let editor = null;

function initEditor() {
    // setTimeout(() => {

    if (editor == null) {
        editor = new E(editorEle.value);
        editor.config.height = props.control.props.height;
        editor.config.zIndex = 10;
        editor.config.customAlert = function (s, t) {
            switch (t) {
                case 'success':
                    ElMessage.success(s)
                    break
                case 'info':
                    ElMessage.info(s)
                    break
                case 'warning':
                    ElMessage.warning(s)
                    break
                case 'error':
                    ElMessage.error(s)
                    break
                default:
                    ElMessage.info(s)
                    break
            }
        }

        editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            // 'todo',
            'justify',
            'quote',
            // 'emoticon',
            'image',
            // 'video',
            'table',
            'code',
            'splitLine',
            'undo',
            'redo',
        ];
        editor.config.showFullScreen = true;
        editor.config.placeholder = props.control.props.placeholder;
        editor.config.showLinkImg = false;
        editor.config.uploadImgServer = uploadOptions.action;
        editor.config.withCredentials = props.control.props.withCredentials;
        let maxSize = props.control.props.size;
        if (props.control.props.sizeUnit == 'KB') {
            maxSize = 1024 * maxSize;
        } else if (props.control.props.sizeUnit == 'MB') {
            maxSize = 1024 * 1024 * maxSize;
        } else if (props.control.props.sizeUnit == 'GB') {
            maxSize = 1024 * 1024 * 1024 * maxSize;
        }

        editor.config.uploadImgMaxSize = maxSize;
        editor.config.uploadImgAccept = props.control.props.accept.split(',').map(x => x.substr(1));
        editor.config.uploadImgMaxLength = 100 // 一次最多上传 5 个图片
        editor.config.uploadImgHeaders = uploadOptions.getHeaders();
        editor.config.uploadImgHooks = {
            customInsert: function (insertImgFn, res) {
                let fileInfo = uploadOptions.getFileHook(res);
                if (fileInfo.url) {
                    insertImgFn(fileInfo.url);
                } else {
                    ElMessage.error(fileInfo);
                }
            }
        }

        editor.config.onchange = function (newHtml) {

            if (props.model) {
                props.model[props.control.id] = newHtml;
            }
        };
        editor.create();
    }

    if (props.model) {
        editor.txt.html(props.model[props.control.id]);
    }

    // }, 50);
}

onMounted(() => {
    initEditor();
})

onBeforeUnmount(() => {
    if (editor != null) {
        editor.destroy();
        editor = null;
    }
});



</script>

<template>
    <div ref="editorEle"></div>
</template>
