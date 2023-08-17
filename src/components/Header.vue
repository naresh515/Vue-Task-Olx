<template>
    <div class="nav">
        <router-link to="/"><i class="fa-solid fa-house"></i> Home</router-link>
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
        <div class="toggle-icon" v-if="$route.name !== 'login' && $route.name !== 'signup'" @click="showDiv1 = true">
            <button class="bt" ref="showDivBar1">{{ firstLatter }}</button>
            <div class="icons" v-show="showDiv1" ref="showDivResult1">
                <div class="userDetails">
                    <router-link to="/add" class="add-items"><i class="fa-solid fa-plus"></i> &nbsp; Add item</router-link>
                </div>
                <div class="userDetails">
                    <p><router-link to="/deshboard" class="add-items">Profile</router-link></p>
                </div>
                <div class="userDetails">
                    <a href="#" v-on:click="logout()" class="add-items">Logout</a>
                </div>
            </div>
        </div>
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
            showDiv: false,
            showDiv1: false,
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
            const searchBar1 = this.$refs.showDivBar1
            const searchResult1 = this.$refs.showDivResult1
            if (searchBar1 && searchResult1 && !searchBar1.contains(event.target) && !searchResult1.contains(event.target)) {
                this.showDiv1 = false
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
    computed: {
        firstLatter() {
            const userInfo = JSON.parse(localStorage.getItem("user-info"));
            var datastore = userInfo[0];
            var fullname = datastore.fullname;
            console.log(fullname)
            return datastore.fullname.slice(0, 1)
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
    justify-content: flex-start;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 5px 6px 10px #221e1e;
    position: fixed;
    top: 65px;
    max-height: 355px;
    overflow-y: scroll;
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
    display: grid;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #cac0c0;
    padding: 10px 0px;
    cursor: pointer;
    grid-template-columns: 20% 60%;
    justify-items: center;
    justify-content: center
}

.add-items {
    font-size: 15px !important;
}

.toggle-icon {
    position: relative;
}

.icons {
    position: fixed;
    background: #333;
    right: 24px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 150px;
    text-align: center;
    top: 55px;
}

.icons a {
    padding: 10px 0px;
    margin: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.userDetails {
    margin: 10px 0px 0px;
}

.bt {
    margin-right: 30px;
    cursor: pointer;
    text-transform: capitalize;
    background: #db7a84;
    color: white;
    padding: 0;
    border-radius: 50%;
    font-size: 15px;
    border: none;
    outline: none;
    height: 32px;
    width: 32px;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .nav-bar {
        display: none;
    }

    .nav a[data-v-c970699f] {
        font-size: 15px;
    }

    .icons {
        right: 0;
    }
}
</style>