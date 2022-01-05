import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("inputnumber", "数字框");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '数字框',
            defaultValue: 0,
            placeholder: '',
            disabled: false,
            min: 0,
            max: 100,
            step: 1,
            stepStrictly: false,
            precision: 0,
            controls: true,
            controlsPosition: '',
            customClass: '',
        };
        this.events = {};
        this.rules = [];
        this._renderer = markRaw(Renderer);
        this._propEditor = markRaw(PropEditor);
    }
    clone() {
        return new Control();
    }
}
Control.type = "inputnumber";
Control.label = "数字框";
export default Control;