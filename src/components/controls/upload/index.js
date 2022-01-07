import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("upload", "文件上传");
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '文件上传',
            multiple: false,
            withCredentials: false,
            showFileList: true,
            accept: '',
            limit: 1,
            disabled: false,
            customClass: '',
        };
    }
}
Control.type = "upload";
Control.label = "文件上传";
export default { Control, Renderer, PropEditor };