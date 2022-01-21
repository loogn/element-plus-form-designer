<script setup>
import { reactive } from "vue";

// import FormDesigner from "./components/formdesigner/FormDesigner.vue"

import { FormDesigner } from '../dist/build.es.js';



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
</script>

<template>
  <div class="h-full">
    <FormDesigner :uploadOptions="uploadOptions" :formData="data"></FormDesigner>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
