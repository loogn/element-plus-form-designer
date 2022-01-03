<script setup>
import FormDesigner from "./components/FormDesigner.vue";
</script>

<template>
  <div class="h-full p-3">
    <FormDesigner :gridCols="2"></FormDesigner>
  </div>
</template>

<style>
#app {
  height: 100vh;
  
  background-color: #eee;
}
</style>
