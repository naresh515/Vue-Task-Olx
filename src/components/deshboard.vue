<template>
    <div class="container">
        <ul class="tab-btn">
            <li class="tab-button" @click="setProduct('profile')">profile Details</li>
            <li class="tab-button" @click="setProduct('product')">Uploaded Product</li>
        </ul>
        <div class="details">
            <myprofile :store="store" v-if="activeTab == 'profile'" />
            <myproduct :product="product" v-if="activeTab == 'product'" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import myprofile from "./myProfile.vue";
import myproduct from "./myProduct.vue"

export default {
    name: "profile",
    data() {
        return {
            store: [],
            product: [],
            activeTab: "profile"
        }
    },
    components: {
        myprofile, myproduct
    },
    methods: {
        getdata() {
            let result = JSON.parse(localStorage.getItem("user-info"));
            console.log(result[0])
            this.store = result[0]
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
        setProduct(tab) {
            this.activeTab = tab
        }
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
    display: flex;
}

.tab-btn {
    padding: 10px;
    border-radius: 10px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.tab-button {
    font-size: 15px;
    text-transform: capitalize;
    padding: 5px 10px;
    border-radius: 5px;
    background: #4e99a2;
    color: white;
    cursor: pointer;
    transition: all .5s ease-in-out;
}

.tab-button::marker {
    content: '';
}

.tab-button:hover,
.tab-button:focus {
    background-color: white;
    color: #4e99a2;
    transition: all .5s ease-in-out;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .container[data-v-dbefb4f4]{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    table{
        margin: 0 auto;
    }
}
</style>