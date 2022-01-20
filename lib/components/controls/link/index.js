import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("link", "链接");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '链接',
            type: 'primary',
            underline: false,
            disabled: false,
            href: 'http://www.baidu.com',
            target: '_blank',
            content: '百度',
            customClass: '',
        };
    }
}
Control.type = "link";
Control.label = "链接";
export default { Control, Renderer, PropEditor, Viewer: Renderer };