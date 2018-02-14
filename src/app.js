import Vue from 'vue';
// Components
import Hello from './components/hello.vue';


new Vue({
    el: '#vue-app',
    components: {
        hello: Hello,
    },
    data: {
        test: 'test',
    },
    methods: {

    },
    created: function () {
    },
});