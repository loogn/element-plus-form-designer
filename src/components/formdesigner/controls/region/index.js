import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import Viewer from './Viewer.vue';
class Control extends BaseControl {
    constructor() {
        super("region", "地区选择");
        this.dataType = 'array';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '地区选择',
            defaultValue: [],
            placeholder: '请选择地区',
            required: false,
            requiredMessage: '必填字段',
            showAllLevels: true,
            disabled: false,
            clearable: true,
            filterable: true,
            valueField: 'label',
            expandTrigger: 'click',
            multiple: false,
            // checkStrictly: false,
            emitPath: true,
            customClass: '',
            showOptionLabel: false,
        };
        this.rules = [{ message: '必填字段', required: false }];
    }
}
Control.type = "region";
Control.label = "地区选择";
export default { Control, Renderer, PropEditor,Viewer };