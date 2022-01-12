import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("textarea", "多行文本");
        this.dataType='string';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '多行文本',
            defaultValue: '',
            placeholder: '',
            required: false,
            requiredMessage: '必填字段',
            pattern: '',
            patternMessage: '格式不正确',
            disabled: false,
            readonly: false,
            showWordLimit: false,
            maxlength: 50,
            rows: 3,
            autosize: false,
            customClass: '',
        };
        this.rules = [
            { message: '必填字段', required: false },
            { pattern: undefined, message: '格式不正确' }];
    }
}
Control.type = "textarea";
Control.label = "多行文本";
export default { Control, Renderer, PropEditor };