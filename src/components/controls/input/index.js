import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("input", "单行文本");
        this.props = {
            width: 24,
            labelWidth: '',
            label: '单行文本',
            defaultValue: '',
            required: false,
            requiredMessage: '',
            placeholder: '',
            disabled: false,
        };
        this.events = {};
        this.rules = [];
        this._renderer = markRaw(Renderer);
        this._propEditor = markRaw(PropEditor);
    }
}
Control.type = "input";
Control.label = "单行文本";
export default Control;