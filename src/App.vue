<script setup>
import { reactive } from "vue";
import FormDesigner from "./components/FormDesigner.vue";
let formJson = `{
  "controls": [
    {
      "type": "input",
      "name": "单行文本",
      "key": "Qjy25tM77",
      "id": "input_Qjy25tM77",
      "lock": false,
      "props": {
        "type": "text",
        "width": 12,
        "showLabel": true,
        "labelWidth": null,
        "label": "单行文本",
        "defaultValue": "这仨发的",
        "placeholder": "",
        "required": false,
        "requiredMessage": "必填字段",
        "pattern": "",
        "patternMessage": "格式不正确",
        "disabled": false,
        "clearable": false,
        "readonly": false,
        "showPassword": false,
        "showWordLimit": false,
        "maxlength": 50,
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
    },
    {
      "type": "inputnumber",
      "name": "数字框",
      "key": "J6jt02Rjc",
      "id": "inputnumber_J6jt02Rjc",
      "lock": true,
      "props": {
        "width": 12,
        "showLabel": true,
        "labelWidth": null,
        "label": "数字框",
        "defaultValue": 0,
        "placeholder": "",
        "disabled": false,
        "min": 0,
        "max": 100,
        "step": 1,
        "stepStrictly": false,
        "precision": 0,
        "controls": true,
        "controlsPosition": "",
        "customClass": ""
      }
    },
    {
      "type": "date",
      "name": "日期选择",
      "key": "zpxhPL3aX",
      "id": "date_zpxhPL3aX",
      "lock": false,
      "props": {
        "width": 12,
        "type": "date",
        "showLabel": true,
        "labelWidth": null,
        "label": "日期选择",
        "defaultValue": "",
        "placeholder": "",
        "required": false,
        "requiredMessage": "必填字段",
        "disabled": false,
        "clearable": true,
        "readonly": false,
        "editable": true,
        "format": "YYYY-MM-DD",
        "customClass": ""
      },
      "rules": [
        {
          "message": "必填字段",
          "required": false
        }
      ]
    }
  ],
  "props": {
    "labelPosition": "top",
    "labelWidth": 100,
    "size": "default",
    "customClass": "",
    "cols": 12
  }
}`;
let formData = JSON.parse(formJson);
let data = reactive({});

function showData() {
  console.log(data);
}
</script>

<template>
  <el-button type="danger" class="absolute top-0 left-0 z-50" @click="showData">console</el-button>
  <div class="h-full">
    <FormDesigner :formData="data"></FormDesigner>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
