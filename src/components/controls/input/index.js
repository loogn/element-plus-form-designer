import BaseControl from "../BaseControl";

import DesignerRender from "./DesignerRender.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("input", "单行文本");
        this.props = {
            type: 'text',
            width: 24,
            labelWidth: '',
            label: '单行文本',
            defaultValue: '',
            placeholder: '',
            required: false,
            requiredMessage: '',
            disabled: false,
            clearable: false,
            readonly: false,
            showPassword: false,
            showWordLimit:false,
        };
        this.events = {};
        this.rules = [];
        this._designerRender = markRaw(DesignerRender);
        this._propEditor = markRaw(PropEditor);
    }
}
Control.type = "input";
Control.label = "单行文本";
export default Control;