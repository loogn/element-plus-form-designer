import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";

class Control extends BaseControl {
    constructor() {
        super("table", "表格");
        this.dataType = 'number';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            defaultValue: [],
            label: '表格',
            columns: [{ name: '列1' }, { name: '列2' }, { name: '列3' }, { name: '列4' }, { name: '列5' }, { name: '列6' }, { name: '列7' }, { name: '列8' }],
            addable: true,
            cloneable: true,
            deleteable: true,
            stripe: false,
            border: false,
            align: 'left',
            defaultRows: 3,
            maxRows: 5,
            maxHeight: 300,
            disabled: false,
            required: false,
            customClass: '',
        };
    }
}

Control.type = "table";
Control.label = "表格";
export default { Control, Renderer, PropEditor };