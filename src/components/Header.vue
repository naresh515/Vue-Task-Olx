<template>
    <div class="nav">
        <router-link to="/"><i class="fa-solid fa-house"></i> Home</router-link>
        <router-link to="/add" class="add-items" v-if="$route.name !== 'login' && $route.name !== 'signup'"><i
                class="fa-solid fa-plus"></i> &nbsp; Add item</router-link>
        <div class="userDetails" v-if="$route.name !== 'login' && $route.name !== 'signup'">
            <p><router-link to="/deshboard" class="add-items">Profile</router-link></p>
        </div>
        <div class="nav-bar" @click="showDiv = true" v-if="$route.name !== 'login' && $route.name !== 'signup'">
            <input type="text" class="search-box" placeholder="Find Cars, Mobile Phones and more..." v-model="searchQuery"
                ref="showDivBar" />
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <div class="searchBar-result" v-show="showDiv" ref="showDivResult">
                <div class="items" v-for="item in filteredData" :key="item.id" @click="handleButton(item.name)">
                    <img class="imgs" :src="item.photo">
                    <button @click="navigateToProduct(item.name)">
                        {{ item.name }}</button>
                </div>
            </div>
        </div>
        <a href="#" v-on:click="logout()" class="add-items"
            v-if="$route.name !== 'login' && $route.name !== 'signup'">Logout</a>
        <p v-if="$route.name === 'signup'"><router-link to="/login" class="add-items">Login</router-link></p>
        <p v-if="$route.name === 'login'"><router-link to="/signup" class="add-items">Signup</router-link></p>
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
            filteredData: [],
            showDiv: false
        }
    },
    methods: {
        logout() {
            localStorage.clear();
        },
        handleButton() {
            this.filteredData = this.products
        },
        navigateToProduct(name) {
            this.$emit('search', name)
        },
        OnClickOutside(event) {
            const searchBar = this.$refs.showDivBar
            const searchResult = this.$refs.showDivResult
            if (searchBar && searchResult && !searchBar.contains(event.target) && !searchResult.contains(event.target)) {
                this.showDiv = false
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.OnClickOutside)
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
    position: sticky;
    top: 0;
    z-index: 9
}

.nav a {
    color: white;
    text-align: center;
    padding: 16px 14px;
    text-decoration: none;
    font-size: 20px;
    margin-right: 20px;
    transition: all .3s ease-in-out;
    cursor: pointer;
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
    position: fixed;
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

.add-items {
    font-size: 15px !important;
}
</style>