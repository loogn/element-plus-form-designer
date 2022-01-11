import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("editor", "编辑器");
        this.valueType='string';
        this.props = {
            width: 12,
            placeholder: '请输入内容',
            showLabel: true,
            labelWidth: undefined,
            height: 150,
            label: '编辑器',
            defaultValue: '',
            sizeUnit: 'MB',
            size: 5,
            required: false,
            requiredMessage: '必填字段',
            withCredentials: false,
            accept: '.jpeg,.jpg,.png,.gif,.bmp',
            disabled: false,
            customClass: '',
        };
        this.rules = [{ message: '必填字段', required: false }];
    }
}
Control.type = "editor";
Control.label = "编辑器";
export default { Control, Renderer, PropEditor };