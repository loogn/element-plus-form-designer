import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("upload", "文件上传");
        this.dataType='string';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '文件上传',
            defaultValue:'',
            buttonText: '点击上传',
            sizeUnit: 'MB',
            size: 5,
            required: false,
            requiredMessage: '必填字段',
            multiple: false,
            withCredentials: false,
            showFileList: true,
            accept: '.jpeg,.jpg,.png',
            limit: 2,
            disabled: false,
            tip: '请上传文件',
            customClass: '',
        };
        this.rules = [{ message: '必填字段', required: false }];
    }
}
Control.type = "upload";
Control.label = "文件上传";
export default { Control, Renderer, PropEditor };