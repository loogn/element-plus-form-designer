import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("divider", "分割线");
        this.props = {
            width: 12,
            showLabel: false,
            content: '分割线',
            contentPosition: 'center',
            borderStyle: "solid",
            customClass: '',
        };
    }
    clone() {
        return new Control();
    }
}
Control.type = "divider";
Control.label = "分割线";
export default { Control, Renderer, PropEditor };