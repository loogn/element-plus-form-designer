import input from "./input";
import textarea from './textarea';
import inputnumber from './inputnumber';
import select from './select';
import radio from './radio';
import checkbox from './checkbox';
import rate from "./rate";
import color from './color';
import date from './date';
import time from './time';
import $switch from './switch';
import slider from './slider';
import text from './text';
import html from './html';
import link from './link';
import divider from './divider';
import upload from './upload';
import uploadImage from './uploadImage';
let types = {
    input,
    textarea,
    inputnumber,
    select,
    radio,
    checkbox,
    rate,
    color,
    date,
    time,
    'switch': $switch,
    slider,
    text,
    html,
    link,
    divider,

    upload,
    uploadImage
}

let groups = [
    {
        name: '基础组件', types: [
            input.Control,
            textarea.Control,
            inputnumber.Control,
            select.Control,
            radio.Control,
            checkbox.Control,
            rate.Control,
            color.Control,
            date.Control,
            time.Control,
            $switch.Control,
            slider.Control,
            text.Control,
            html.Control,
            link.Control,
            divider.Control,
        ]
    },

    {
        name: '高级组件', types: [
            upload.Control,
            uploadImage.Control
        ]
    }
];

export {
    groups,
    types
};

