import FormDesigner from './components/FormDesigner.vue';
import FormRenderer from './components/FormRenderer.vue';

const install = function (Vue) {
    Vue.component(FormDesigner.name, FormDesigner);
    Vue.component(FormRenderer.name, FormRenderer);
}

export { install, FormDesigner, FormRenderer };

export default {
    install, FormDesigner, FormRenderer
}