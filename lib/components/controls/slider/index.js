import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("slider", "滑块");
        this.dataType='number';
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
    }
}
Control.type = "slider";
Control.label = "滑块";
export default { Control, Renderer, PropEditor };