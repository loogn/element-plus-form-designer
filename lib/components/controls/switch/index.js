import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("switch", "开关");
        this.dataType='bool';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '开关',
            defaultValue: false,
            required: false,
            disabled: false,
            activeText: '',
            inactiveText: '',
            inlinePrompt: false,
            activeColor: '#409EFF',
            inactiveColor: '#C0CCDA',
            customClass: '',
        };
        this.rules = [{ required: false }];
    }
    clone() {
        return new Control();
    }
}
Control.type = "switch";
Control.label = "开关";
export default { Control, Renderer, PropEditor };