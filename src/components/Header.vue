<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add item</router-link>
        <div class="nav-bar">
            <input type="text" class="search-box" placeholder="Find Cars, Mobile Phones and more..."
                v-model="searchQuery" />
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <div class="searchBar-result">
                <div class="items" v-for="item in filteredData" :key="item.id" @click="handleButton(item.name)">
                    <img class="imgs" :src="item.photo">
                    <button>
                        {{ item.name }}</button>
                </div>
            </div>
        </div>
        <a href="#" v-on:click="logout()">Logout</a>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Header",
    data() {
        return {
            searchQuery: '',
            products: [],
            filteredData: []
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: "login" })
        },
        handleButton(newQuery) {
            this.filteredData = this.products.filter(product => {
                return product.name.toLowerCase().includes(newQuery.toLowerCase());
            });
        }
    },
    created() {
        axios.get('http://localhost:3000/Product')
            .then(response => {
                this.products = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    watch: {
        searchQuery: function (newQuery) {
            this.filteredData = this.products.filter(product => {
                return product.name.toLowerCase().includes(newQuery.toLowerCase());
            });
            console.log(this.filteredData);
        }
    },
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

.searchBar-result {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 5px 6px 10px #221e1e;
    position: absolute;
    top: 65px;
}

.searchBar-result button {
    background: none;
    border: none;
    margin: 15px 0px;
    font-size: 15px;
    cursor: pointer;
    outline: none;
}

.imgs {
    width: 50px;
    height: 50px;
    border: 1px solid #cac0c0;
    border-radius: 50%;
    margin: 0px;
    padding: 5px;
    cursor: pointer;
}

.items {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #cac0c0;
    padding: 10px 0px;
    cursor: pointer;
}
</style>