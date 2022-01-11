import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("uploadImage", "图片上传");
        this.valueType='string';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '图片上传',
            defaultValue: '',
            sizeUnit: 'MB',
            size: 5,
            required: false,
            requiredMessage: '必填字段',
            multiple: false,
            withCredentials: false,
            showFileList: true,
            accept: '.jpg,.png',
            limit: 2,
            disabled: false,
            tip: '',
            customClass: '',
        };
        this.rules = [{ message: '必填字段', required: false }];
    }
}
Control.type = "uploadImage";
Control.label = "图片上传";
export default { Control, Renderer, PropEditor };