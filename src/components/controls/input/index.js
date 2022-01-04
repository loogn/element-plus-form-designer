import BaseControl from "../BaseControl";

import DesignerRender from "./DesignerRender.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("input", "单行文本");
        this.props = {
            type: 'text',
            width: 12,
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
        this._designerRender = markRaw(DesignerRender);
        this._propEditor = markRaw(PropEditor);
    }
    clone() {
        return new Control();
    }
}
Control.type = "input";
Control.label = "单行文本";
export default Control;