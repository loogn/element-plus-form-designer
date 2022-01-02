<script setup>
import { ref, reactive } from 'vue'
import NameIcon from "./NameIcon.vue";
import draggable from 'vuedraggable';
import _ from "lodash";
import Input from "./controls/input";
import Textarea from './controls/textarea';

let baseControls = [
    Input, Textarea
];
let data = reactive({
    controls: [],
});

defineProps({

})
function clone(original) {
    var control = new original();

    return control;
}
function onChange(evt) {
    // if (evt.added) {
    //     clickHandle(evt.added.element)
    //     //page.curCom = evt.added.element;
    //     //page.curCom.isActive = true;
    // }
    console.log("---onChange---", evt);
}

const count = ref(0)
</script>

<template>
    <div class="epfd-container">
        <div class="epdf-left-board">
            <div class="epdf-com-title">
                <el-icon>
                    <NameIcon name="component" />
                </el-icon>
                <span>基础属性</span>
            </div>

            <draggable
                :list="baseControls"
                item-key="type"
                tag="ul"
                class="epdf-com-group"
                :clone="clone"
                :group="{ name: 'com', pull: 'clone', put: false }"
            >
                <template #item="{ element }">
                    <li class="epdf-com-label">
                        <el-icon>
                            <NameIcon :name="element.type" />
                        </el-icon>
                        <span>{{ element.label }}</span>
                    </li>
                </template>
            </draggable>
        </div>
        <div class="epdf-center-board">
            <el-form class="h-full" label-position="right">
                <draggable
                    :list="data.controls"
                    item-key="id"
                    class="h-full flex flex-wrap overflow-y-auto content-start"
                    @change="onChange"
                    :sort="true"
                    :group="{ name: 'com', pull: true, put: true }"
                >
                    <template #item="{ element }">
                        <component :is="element._renderer" :control="element" />
                    </template>
                </draggable>
            </el-form>
        </div>
        <div class="epdf-right-board"></div>
    </div>
</template>

<style lang="scss">
.epfd-container {
    @apply w-full h-full overflow-hidden flex font-mono;
    .epdf-left-board {
        @apply bg-white box-border px-4 pt-6 flex-shrink-0;
        width: 260px;
        .epdf-com-title {
            @apply flex items-baseline;
            span {
                @apply ml-1;
            }
        }
        .epdf-com-group {
            @apply grid grid-cols-2 gap-y-1 gap-x-1.5 mt-2;
        }
        .epdf-com-label {
            @apply bg-gray-100 text-xs text-gray-600 px-3 py-1.5 box-border
            flex items-center
            border border-dashed border-transparent;
            &:hover {
                @apply border-blue-500 text-blue-500 cursor-move;
            }
            span {
                @apply ml-1.5;
            }
        }
    }
    .epdf-center-board {
        @apply flex-grow p-2 bg-gray-300;
        .el-form {
            @apply bg-white;
        }
        .epdf-form-item-wrap {
            .opt {
                @apply hidden absolute bg-blue-500 text-white z-10 top-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
            }
            @apply relative border border-dashed box-border p-2 bg-blue-50 cursor-move;
            .el-form-item__label {
                @apply cursor-move;
            }
            &:hover,
            &.is-selected {
                @apply bg-blue-100 border-blue-500 border-solid;
                .opt{
                    @apply flex;
                }
            }
        }
    }

    .epdf-right-board {
        @apply bg-white  box-border flex-shrink-0;
        width: 350px;
    }
}
</style>
