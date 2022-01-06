import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("color", "颜色选择");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '颜色选择',
            defaultValue: '',
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            customClass: '',
            // size: 'default',
            showAlpha: false,
            colorFormat: undefined,

            showOptionLabel: false,
            options: []
        };
        // this.events = {};
        this.rules = [{ message: '必填字段', required: false }];
    }
    clone() {
        return new Control();
    }
}
Control.type = "color";
Control.label = "颜色选择";
export default { Control, Renderer, PropEditor };