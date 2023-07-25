<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add item</router-link>
        <div class="nav-bar">
            <input type="text" class="search-box" placeholder="Find Cars, Mobile Phones and more..." v-model="searchQuery"
                @input="filterData" />
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
        <a href="#" v-on:click="logout()">Logout</a>
    </div>
</template>
<script>
export default {
    name: "Header",
    data() {
        return {
            searchQuery: '',
            filterData: []
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: "login" })
        }
    }
}
</script>

<style scoped>
.nav {
    background-color: #333;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav a {
    color: white;
    text-align: center;
    padding: 16px 14px;
    text-decoration: none;
    font-size: 20px;
    margin-right: 20px;
    transition: all .3s ease-in-out;
}

.nav a:hover {
    background-color: #ddd;
    color: #222;
    transition: all .3s ease-in-out;
}

.search-box {
    width: 400px;
    height: 40px;
    outline: none;
    text-indent: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.search-icon {
    color: white;
    height: 20px;
    padding: 10px;
    border-top-right-radius: 10px;
    background: #4e99a2;
    border-bottom-right-radius: 10px;
    cursor: pointer;
}

.nav-bar {
    display: flex;
}

.logo {
    height: 40px;
}

@media (max-width: 800px) {}
</style>