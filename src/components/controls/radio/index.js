import BaseControl from "../BaseControl";

import DesignerRender from "./DesignerRender.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("radio", "单选框组");
        this.props = {
            width: 12,
            labelWidth: undefined,
            label: '单选框组',
            defaultValue: '',
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            customClass: '',
            showOptionLabel: true,
            options: [
                { label: '1', text: '选项1' },
                { label: '2', text: '选项2' },
                { label: '3', text: '选项3' },
            ]
        };
        this.events = {};
        this.rules = [{ message: '必填字段', required: false }];
        this._designerRender = markRaw(DesignerRender);
        this._propEditor = markRaw(PropEditor);
    }
    clone() {
        return new Control();
    }
}
Control.type = "radio";
Control.label = "单选框组";
export default Control;