import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("input", "单行文本");
        this.props = {
            type: 'text',
            width: 12,
            showLabel:true,
            labelWidth: undefined,
            label: '单行文本',
            defaultValue: '',
            placeholder: '',
            required: false,
            requiredMessage: '必填字段',
            pattern: '',
            patternMessage: '格式不正确',
            disabled: false,
            clearable: false,
            readonly: false,
            showPassword: false,
            showWordLimit: false,
            maxlength: 50,
            customClass:'',
        };
        this.events = {};
        this.rules = [
            { message: '必填字段', required: false },
            { pattern: undefined, message: '格式不正确' }];
    }
    clone() {
        return new Control();
    }
}
Control.type = "input";
Control.label = "单行文本";
export default { Control, Renderer, PropEditor };