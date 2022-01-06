import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("time", "时间选择");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '时间选择',
            defaultValue: '',
            placeholder: '请选择时间',
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            clearable: true,
            editable: true,
            start: '09:00',
            end: '18:00',
            step: '00:30',
            customClass: '',
        };
        this.rules = [
            { message: '必填字段', required: false }];
    }
    clone() {
        return new Control();
    }
}
Control.type = "time";
Control.label = "时间选择";
export default { Control, Renderer, PropEditor };