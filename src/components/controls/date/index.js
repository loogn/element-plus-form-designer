import BaseControl from "../BaseControl";

import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import { markRaw } from 'vue';

class Control extends BaseControl {
    constructor() {
        super("date", "日期选择");
        this.props = {
            width: 12,
            type: 'date', //year/month/date/datetime/week
            showLabel: true,
            labelWidth: undefined,
            label: '日期选择',
            defaultValue: '',
            placeholder: '',
            required: false,
            requiredMessage: '必填字段',
            disabled: false,
            clearable: true,
            readonly: false,
            editable: true,
            format: 'YYYY-MM-DD',
            customClass: '',
        };
        this.events = {};
        this.rules = [
            { message: '必填字段', required: false }];
    }
    clone() {
        return new Control();
    }
}
Control.type = "date";
Control.label = "日期选择";
export default { Control, Renderer, PropEditor };