<template>
    <div class="container">
        <div class="img-container first">
            <img class="imgs" :src="Product.photo">
            <span class="product-name">Name: &nbsp; {{ Product.name }}</span>
            <span class="product-details">Details: &nbsp; {{ Product.details }}</span>
            <span class="product-price"><i class="fa-solid fa-indian-rupee-sign"></i> : &nbsp; {{ Product.price }}</span>
            <span class="product-Uname">User-Name: &nbsp; {{ Product.Uname }}</span>
            <span class="product-email">Email: &nbsp;{{ Product.email }}</span>
            <span class="product-mobile">Mobile Number: &nbsp;{{ Product.mobile }}</span>
            <span class="product-Address">Address: &nbsp;{{ Product.Address }}</span>
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
            let result = await axios.get("http://localhost:3000/Product/" + this.$route.params.id)
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

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
@media screen and (min-width: 320px) and (max-width: 800px) {
    .first{
        margin-left: 0px !important;
    }
    .img-container{
        width: 90% !important;
    }
}
</style>