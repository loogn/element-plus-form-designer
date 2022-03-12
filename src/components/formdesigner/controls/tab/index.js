import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import Viewer from './Viewer.vue';
class Control extends BaseControl {
    constructor() {
        super("tab", "选项卡");
        this.props = {
            type: 'tab',
            width: 12,
            showLabel:false,
            labelWidth: undefined,
            label: '选项卡',
            customClass:'',
            columns: [
                {
                  label: 'Tab1',
                  controls: []
                }
              ],
        };
    }
}
Control.type = "tab";
Control.label = "选项卡";
export default { Control, Renderer, PropEditor,Viewer };