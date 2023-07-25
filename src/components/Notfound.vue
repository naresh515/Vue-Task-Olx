<template>
    <h1>Page Not Found</h1>
    <button v-on:click="getLogin()">login</button>
</template>
<script>
export default {
    name: 'notFound',
    methods: {
        getLogin() {
            localStorage.clear();
            this.$router.push({ name: "login" })
        }
    }
}
</script>
<style scoped>
button {
    border: 1px solid lightblue;
    width: 300px;
    height: 40px;
    cursor: pointer;
    background-color: skyblue;
    color: #fff;
}
</style>