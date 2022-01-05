import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("select", "下拉选择");
        this.props = {
            width: 12,
            showLabel:true,
            labelWidth: undefined,
            label: '下拉选择',
            defaultValue: '',
            placeholder: ' ',
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            clearable:true,
            filterable:true,
            customClass: '',
            
            showOptionLabel: false,
            options: [
                { label: '值1', text: '选项1' },
                { label: '值2', text: '选项2' }
            ]
        };
        this.events = {};
        this.rules = [{ message: '必填字段', required: false }];
        this._renderer = markRaw(Renderer);
        this._propEditor = markRaw(PropEditor);
    }
    clone() {
        return new Control();
    }
}
Control.type = "select";
Control.label = "下拉选择";
export default Control;