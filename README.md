# element-plus-form-designer
# 基于 vue3 和 element-plus 的表单设计器.

保函两个组件 FormDesigner 和 FormRenderer.
FormDesigner 组件用于设计表单，FormRenderer 组件用于呈现表单组件和获取表单提交数据。



注：npm中有```element-plus-form-designer``` 包，但是不能使用，还没研究好如何正确发布到 npm ，有点尴尬。

![Log in to view](https://gitee.com/loogn/element-plus-form-designer/raw/master/preview.png "preview.png")

## FormDesigner 使用

setup代码： 
```js
import { reactive } from "vue";
import FormDesigner from "./components/FormDesigner.vue";

let data = reactive({});

let uploadOptions = {
  action: 'http://localhost/UploadFile',
  getHeaders: function () {
    return { 'token': '123456' };
  },
  getFileHook: (res) => {
    if (res.success) {
      return {
        name: res.url.substr(res.url.lastIndexOf('/') + 1),
        url: res.url
      };
    } else {
      return res.msg;
    }
  }
}
```
模板代码：
```xml
<div class="h-full w-full">
    <FormDesigner :uploadOptions="uploadOptions" :formData="data"></FormDesigner>
</div>
```

FormDesigner 组件会是百分之百宽高，大小控制父容器即可。

## 说明：

formData默认值为：
```json
{
  "controls": [],
  "props": {
    "labelPosition": "right",
    "labelWidth": 100,
    "size": "default",
    "customClass": "",
    "cols": 12
  }
}
```
controls里每个元素大概是这样的格式，以 select 为例子：
```json
{
      "type": "select",
      "name": "下拉选择",
      "key": "qFahSi153",
      "id": "select_qFahSi153",
      "lock": false,
      "valueType": "string",
      "props": {
        "width": 12,
        "showLabel": true,
        "labelWidth": null,
        "label": "下拉选择",
        "defaultValue": "",
        "placeholder": "请选择",
        "required": false,
        "requiredMessage": "必填字段",
        "disabled": false,
        "clearable": true,
        "filterable": true,
        "customClass": "",
        "showOptionLabel": false,
        "options": [
          {
            "value": "值1",
            "label": "选项1"
          },
          {
            "value": "值2",
            "label": "选项2"
          }
        ]
      },
      "rules": [
        {
          "message": "必填字段",
          "required": false
        }
      ]
    }
```

其中的 ```lock```属性，用于再次编辑的时候，如果要阻止组件删除，可以设置为```true```。

uploadOptions说明：
- action 表单内上传组件的上传地址。
- getHeaders 一个方法，返回自定义上传头内容。
- getFileHook 一个方法，自定义从action返回结果中获取文件信息，成功返回  ```{name:'文件名称',url:'文件地址'}```，失败返回错误信息字符串。  




## FormRenderer 使用

setup js代码
```js
import FormRenderer from './components/FormRenderer.vue';
import { reactive ,ref } from 'vue';
let data = reactive({
    formData: {},
    formModel: {}
})
let formRenderer=ref(null);
//formData 来自 FormDesigner 组件，意义相同，用于构建表单结构
//formModel 为表单数据，应该来自后台数据，大概是这样：
/*
{
  "select_qFahSi153": "值1",
  "input_t6ciGfNlv": "12",
  "checkbox_la0CN3uuA": [
    "值1","值2"
  ]
}
*/

```

模板代码：
```xml
<FormRenderer
        ref="formRenderer"
        :formData="data.formData"
        :formModel="data.formModel"
    />
```

FormRenderer 公开的 el-form 的几个方法：
- validate  对整个表单作验证。 
- resetFields   对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
- scrollToField  滚动到指定表单字段
- clearValidate   清理指定字段的表单验证信息

具体参考 element-plus 官方文档： https://element-plus.gitee.io/zh-CN/component/form.html#form-%E6%96%B9%E6%B3%95

