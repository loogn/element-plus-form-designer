import $input from "./input";
import $textarea from './textarea';
import $inputNumber from './inputnumber';
import $select from './select';
import $radio from './radio';
import $checkbox from './checkbox';
import $rate from "./rate";
import $color from './color';
import $date from './date';
import $time from './time';
import $switch from './switch';
import $slider from './slider';
import $text from './text';
import $html from './html';
import $link from './link';
import $divider from './divider';
let types = {
    $input,
    $textarea,
    $inputNumber,
    $select,
    $radio,
    $checkbox,
    $rate,
    $color,
    $date,
    $time,
    $switch,
    $slider,
    $text,
    $html,
    $link,
    $divider,
}

let groups = [
    {
        name: '基础组件', types: [
            $input.Control,
            $textarea.Control,
            $inputNumber.Control,
            $select.Control,
            $radio.Control,
            $checkbox.Control,
            $rate.Control,
            $color.Control,
            $date.Control,
            $time.Control,
            $switch.Control,
            $slider.Control,
            $text.Control,
            $html.Control,
            $link.Control,
            $divider.Control,
        ]
    },

    { name: '高级组件', types: [] },
    { name: '其他组件', types: [] },
];

export {
    groups,
    types
};

