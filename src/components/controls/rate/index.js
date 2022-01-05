import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("rate", "评分");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '单行文本',
            defaultValue: 0,
            required: false,
            requiredMessage: '请打分',
            max: 5,
            allowHalf: false,
            showScore: false,
            disabled: false,
            customClass: '',
        };
        this.events = {};
        this.rules = [{ message: '请打分', required: false, trigger: 'change' },
        { type: 'number', min: 0, message: "请打分", trigger: 'change' }
        ];
        this._renderer = markRaw(Renderer);
        this._propEditor = markRaw(PropEditor);
    }
    clone() {
        return new Control();
    }
}
Control.type = "rate";
Control.label = "评分";
export default Control;