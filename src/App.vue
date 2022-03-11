<script setup>
import { reactive,ref } from "vue";

//开发测试方式
import FormDesigner from "./components/formdesigner/FormDesigner.vue"


// //发布测试方式
// import { FormDesigner } from '../dist/build.es.js';
// import "../dist/style.css";


let data = ref({});

data.value={
  "controls": [
    {
      "type": "textarea",
      "name": "多行文本",
      "key": "xNkeci7zl",
      "id": "textarea_xNkeci7zl",
      "lock": true,
      "dataType": "string",
      "props": {
        "width": 12,
        "showLabel": true,
        "label": "多行文本",
        "defaultValue": "",
        "placeholder": "",
        "required": false,
        "requiredMessage": "必填字段",
        "pattern": "",
        "patternMessage": "格式不正确",
        "disabled": false,
        "readonly": false,
        "showWordLimit": false,
        "maxlength": 50,
        "rows": 3,
        "autosize": false,
        "customClass": ""
      },
      "rules": [
        {
          "message": "必填字段",
          "required": false
        },
        {
          "message": "格式不正确"
        }
      ]
    }
  ],
  "props": {
    "labelPosition": "right",
    "labelWidth": 100,
    "size": "default",
    "customClass": "",
    "cols": 12
  }
}

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
    controls: ['upload', 'uploadImage', 'region', 'cascader', 'editor','table','tab']
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
