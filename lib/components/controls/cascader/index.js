import BaseControl from "../BaseControl";
import Renderer from "./Renderer.vue";
import PropEditor from "./PropsEditor.vue";
import Viewer from './Viewer.vue';
class Control extends BaseControl {
    constructor() {
        super("cascader", "级联选择");
        this.dataType = 'array';
        this.props = {
            width: 12,
            showLabel: true,
            labelWidth: undefined,
            label: '级联选择',
            defaultValue: [],
            placeholder: '请选择',
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
            options: [
                {
                    value: '水果',
                    children: [
                        { value: '苹果' },
                        { value: '橘子' },
                    ]
                },
                {
                    value: '蔬菜',
                    children: [
                        {
                            value: '青菜',
                            children: [
                                { value: '芹菜' },
                                { value: '油麦菜' },
                            ]
                        },
                        { value: '西红柿' },
                    ]
                }
            ]
        };
        this.rules = [{ message: '必填字段', required: false }
            // ,{ type: "array", min: 1, message: '请选择接收人' }
        ];
    }
}
Control.type = "cascader";
Control.label = "级联选择";
export default { Control, Renderer, PropEditor,Viewer };