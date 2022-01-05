import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("slider", "滑块");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '滑块',
            defaultValue: 0,
            disabled: false,
            required: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false,
            showStops: false,
            showTooltip: true,
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
Control.type = "slider";
Control.label = "滑块";
export default Control;