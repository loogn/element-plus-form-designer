import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import Viewer from './Viewer.vue';
class Control extends BaseControl {
    constructor() {
        super("checkbox", "多选框组");
        this.dataType='array';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '多选框组',
            defaultValue: [],
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            customClass: '',
            showOptionLabel: false,
            options: [
                { value: '值1', label: '选项1' },
                { value: '值2', label: '选项2' }
            ]
        };
        this.rules = [{ message: '必填字段', required: false }];
    }
}
Control.type = "checkbox";
Control.label = "多选框组";
export default { Control, Renderer, PropEditor,Viewer };