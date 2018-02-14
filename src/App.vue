<template>
    <div>
        <hello></hello>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Hello from './components/hello.vue';

    export default {
        name: "app",
        components: {
            hello: Hello,
        },
        data: function() {
            return {
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>