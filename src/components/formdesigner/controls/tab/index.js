import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import Viewer from './Viewer.vue';
class Control extends BaseControl {
    constructor() {
        super("tab", "选项卡");
        this.dataType='string';
        this.props = {
            type: 'tab',
            width: 12,
            showLabel:false,
            labelWidth: undefined,
            label: '选项卡',
            defaultValue: '',
            placeholder: '',
            required: false,
            requiredMessage: '必填字段',
            pattern: '',
            patternMessage: '格式不正确',
            disabled: false,
            clearable: false,
            readonly: false,
            showPassword: false,
            showWordLimit: false,
            maxlength: 50,
            customClass:'',
            columns: [
                {
                  label: 'Tab1',
                  controls: []
                }
              ],
        };
        this.rules = [
            { message: '必填字段', required: false },
            { pattern: undefined, message: '格式不正确' }];
    }
}
Control.type = "tab";
Control.label = "选项卡";
export default { Control, Renderer, PropEditor,Viewer };