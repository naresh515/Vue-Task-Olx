<template>
    <div class="container">
        <h1>Page Not Found</h1>
        <router-link to="/" class="rout">Return Back To Home</router-link>
        <button v-on:click="getLogin()">login</button>
    </div>
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
button,
.rout {
    border: 1px solid lightblue;
    width: 300px;
    height: 40px;
    cursor: pointer;
    background-color: skyblue;
    color: #fff;
    text-decoration: none;
    display: flex;
    margin: 10px 0px;
    align-items: center;
    justify-content: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>