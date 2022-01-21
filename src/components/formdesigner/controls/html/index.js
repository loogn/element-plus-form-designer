import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("html", "HTML");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: 'HTML',
            content: '<p><font color="#c24f4a">显示的文本</font></p>',
            customClass: '',
        };
    }
}
Control.type = "html";
Control.label = "HTML";
export default { Control, Renderer, PropEditor, Viewer: Renderer };