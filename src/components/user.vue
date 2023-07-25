<template>
    <div class="container">
        <div class="img-container first" v-for="item in Product" :key="item.name">
            <img class="imgs" :src="item.photo">
            <span class="product-name">{{ item.name }}</span>
            <span class="product-details">{{ item.details }}</span>
            <span class="product-price">{{ item.price }}</span>
            <span class="product-Uname">{{ item.Uname }}</span>
            <span class="product-email">{{ item.email }}</span>
            <span class="product-mobile">{{ item.mobile }}</span>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "services",
    data() {
        return {
            Product: [],
        }
    },
    methods: {
        async getdata() {
            let result = await axios.get("http://localhost:3000/Product")
            this.Product = result.data
        }
    },
    mounted() {
        this.getdata()
    }
}
</script>
<style scoped>
.product-price {
    border-bottom: none;
}
</style>