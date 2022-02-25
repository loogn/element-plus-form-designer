<script setup>
import { reactive } from "vue";

//开发测试方式
import FormDesigner from "./components/formdesigner/FormDesigner.vue"


// //发布测试方式
// import { FormDesigner } from '../dist/build.es.js';
// import "../dist/style.css";


let data = reactive({});

function showData() {
  console.log(data);
}
let uploadOptions = {
  action: 'http://localhost:8888/api/Common/UploadFile',
  getHeaders: function () {
    return { 'token': '123' };
  },
  getFileHook: (res) => {
    if (res.success) {
      return {
        name: res.result.url.substr(res.result.url.lastIndexOf('/') + 1),
        url: res.result.url
      };
    } else {
      return res.msg;
    }
  }
}

let controlGroups = [
  {
    name: '基础组件11',
    controls: ['input', 'textarea', 'inputnumber', 'select', 'radio', 'checkbox',
      'rate', 'color', 'date', 'time', 'switch', 'slider', 'text', 'html', 'link', 'divider']
  },
  {
    name: '高级组件12',
    controls: ['upload', 'uploadImage', 'region', 'cascader', 'editor','table']
  },
];
</script>

<template>
  <div class="h-full">
    <FormDesigner :controlGroups="controlGroups" :uploadOptions="uploadOptions" :formData="data"></FormDesigner>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
