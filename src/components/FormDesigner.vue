<script setup>
import { ref } from 'vue'
import NameIcon from "./NameIcon.vue";

defineProps({

})

const count = ref(0)
</script>

<template>
    <div class="epfd-container">
        <div class="epdf-left-board">
            <div class="epdf-com-title">基础属性</div>
            <ul class="epdf-com-group">
                <li class="epdf-com-label" v-for="item in ['inputnumber',
                 'input', 'textarea','radio','checkbox','dropdown'
                 ]">
                    <el-icon>
                        <NameIcon :name="item" />
                    </el-icon>
                    <span>单行文本</span>
                </li>
            </ul>
        </div>
        <div class="epdf-center-board"></div>
        <div class="epdf-right-board"></div>
    </div>
</template>

<style lang="scss">
.epfd-container {
    @apply w-full h-full overflow-hidden flex font-mono;
    .epdf-left-board {
        @apply bg-white box-border px-4 pt-6;
        width: 260px;
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
        @apply flex-grow mx-2.5 bg-white;
    }

    .epdf-right-board {
        @apply bg-white  box-border;
        width: 350px;
    }
}
</style>
