import BaseControl from "../BaseControl";

import DesignerRender from "./DesignerRender.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("textarea", "多行文本");
        this.props = {
            width: 24,
            labelWidth: '',
            label: '多行文本',
            defaultValue: '',
            required: false,
            requiredMessage: '',
            placeholder: '',
            disabled: false,
        };
        this.events = {};
        this.rules = [];
        this._designerRender = markRaw(DesignerRender);
        this._propEditor = markRaw(PropEditor);
    }
}
Control.type = "textarea";
Control.label = "多行文本";
export default Control;