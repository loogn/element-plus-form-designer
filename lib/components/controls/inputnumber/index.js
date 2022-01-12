import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("inputnumber", "数字框");
        this.dataType='number';
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
    }
}
Control.type = "inputnumber";
Control.label = "数字框";
export default { Control, Renderer, PropEditor };