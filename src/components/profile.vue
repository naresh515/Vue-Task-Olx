<template>
    <div class="container">
        <div class="cards">
            <div class="userName user">Name: &nbsp; {{ store.fullname }}</div>
            <div class="userEmail user">Email: &nbsp; {{ store.email }}</div>
            <div class="userMobile user">Mobile: &nbsp; {{ store.mobile }}</div>
        </div>
        <table border="1px">
            <tr>
                <td class="heading">Image</td>
                <td class="heading">product-name</td>
                <td class="heading">product-details</td>
                <td class="heading">product-price</td>
                <td class="heading">Actions</td>
            </tr>

            <tr v-for="item in product">
                <td class="text"> <img class="imgs" :src="item.photo"></td>
                <td class="text">{{ item.name }}</td>
                <td class="text">{{ item.details }}</td>
                <td class="text">{{ item.price }}</td>

                <td class="actions">
                    <router-link :to="'/update/' + item.id">Update</router-link> &nbsp;/ &nbsp;
                    <button v-on:click="deleteRestro(item.id)" class="action-btn">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "profile",
    data() {
        return {
            store: [],
            product: []
        }
    },
    methods: {
        getdata() {
            let result = JSON.parse(localStorage.getItem("user-info"));
            this.store = result
        },
        async products() {
            let dataProduct = await axios.get(`http://localhost:3000/Product?email=${this.store.email}`)
            console.log(dataProduct.data)
            this.product = dataProduct.data
        },
        async deleteRestro(id) {
            let result = await axios.delete("http://localhost:3000/Product/" + id)
            if (result.status == 200) {
                this.products()
            }
        },
    },
    mounted() {
        this.getdata()
        this.products()
    }
}
</script>

<style scoped>
.container {
    width: 100%;
}

.cards {
    width: 350px;
    max-width: 100%;
    height: 200px;
    border: 1px solid #cac0c0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    background-color: #333;
    cursor: pointer;
    transition: all .5s ease-in-out;
    margin: 50px auto 0px;
}

.user {
    width: 100%;
    padding: 15px 20px;
    color: white;
}

table {
    margin: 50px auto 0px;
}

.heading {
    font-family: sans-serif;
    text-transform: capitalize;
    font-weight: 800;
    text-align: center;
    width: 250px;
    max-width: 100%;
}

.text {
    font-family: sans-serif;
    text-transform: capitalize;
    font-weight: 600;
    text-align: center;
}

.imgs {
    width: 200px;
}

.actions {
    text-align: center;
}

.action-btn {
    width: 65px;
    height: 30px;
    max-width: 100%;
    border: 1px solid skyblue;
    background: skyblue;
    color: #fff;
    cursor: pointer;
    float: right;
    margin-right: 20px;
}

.actions a {
    text-decoration: none;
    float: left;
    padding-left: 20px;
}

.actions a:hover {
    background-color: unset;
}
</style>