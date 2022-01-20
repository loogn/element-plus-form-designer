import FormDesigner from './components/FormDesigner.vue';
import FormRenderer from './components/FormRenderer.vue';
import FormViewer from './components/FormViewer.vue';

const install = function (Vue) {
    Vue.component(FormDesigner.name, FormDesigner);
    Vue.component(FormRenderer.name, FormRenderer);
    Vue.component(FormViewer.name, FormViewer);

}

export { install, FormDesigner, FormRenderer, FormViewer };

export default {
    install, FormDesigner, FormRenderer, FormViewer
}