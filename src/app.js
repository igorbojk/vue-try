import Vue from 'vue';
import Hello from './components/hello.vue';

new Vue({
    data: function () {
        return {
            message: 'Webpack and Vue setup'
        }
    },
    el: '#vue-app',
    components: {
        hello: Hello,
    }
});