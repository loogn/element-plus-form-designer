<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import E from "wangeditor";
let props = defineProps({
    control: Object,
    formProps: Object,
});

const editorEle = ref(null);
let editor = null;
onMounted(() => {
    editor = new E(editorEle.value);
    editor.config.height = 200;

    editor.config.menus = [
        // 'head',
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
        // 'link',
        // 'list',
        // 'todo',
        'justify',
        // 'quote',
        'emoticon',
        // 'image',
        // 'video',
        // 'table',
        // 'code',
        'splitLine',
        // 'undo',
        // 'redo',
    ];
    editor.config.showFullScreen = true;
    editor.config.placeholder = '请输入内容';
    editor.config.showLinkImg = false;
    // editor.config.uploadImgServer = uploadUrl;
    // editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    // editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    // editor.config.uploadImgMaxLength = 100 // 一次最多上传 5 个图片
    // editor.config.uploadImgHeaders = getHeaders();
    // editor.config.uploadImgHooks = {
    //     customInsert: function (insertImgFn, res) {
    //         insertImgFn(res.result.url);
    //     }
    // }

    editor.config.onchange = function (newHtml) {
        props.control.props.content = newHtml;
    };
    editor.create();
    editor.txt.html(props.control.props.content);
})
onBeforeUnmount(() => {
    if (editor != null) {
        editor.destroy();
        editor = null;
    }
});


</script>

<template>
    <el-form label-width="90px">
        <el-form-item label="标题">
            <el-input v-model="control.props.label" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label=" " label-width="30px">
            <div ref="editorEle" style="height: 300px;z-index: 2;"></div>
        </el-form-item>

        <el-form-item label="宽度">
            <el-slider
                class="w-11/12"
                :min="0"
                :max="formProps.cols"
                show-stops
                v-model="control.props.width"
            ></el-slider>
        </el-form-item>

        <el-form-item label="显示标题">
            <el-switch v-model="control.props.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input-number v-model="control.props.labelWidth" :min="0" />
        </el-form-item>

        <el-form-item label="自定义类">
            <el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
        </el-form-item>
    </el-form>
</template>
