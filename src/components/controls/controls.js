import Input from "./input";
import Textarea from './textarea';
import InputNumber from './inputnumber';
import Select from './select';
import Radio from './radio';
import Checkbox from './checkbox';
import Rate from "./rate";
import Color from './color';
import Date from './date';
import Time from './time';
import Switch from './switch';
import Slider from './slider';

export default [
    {
        name: '基础组件', types: [
            Input, Textarea, InputNumber, Select,
            Radio, Checkbox, Rate, Color,
            Date, Time, Switch, Slider
        ]
    },

    { name: '高级组件', types: [] },
    { name: '其他组件', types: [] },

]
