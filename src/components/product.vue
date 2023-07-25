<template>
    <div class="container">
        <div class="img-container first" v-for="item in Product" :key="item.name">
            <img class="imgs" :src="item.photo">
            <span class="product-name">{{ item.name }}</span>
            <span class="product-details">{{ item.details }}</span>
            <span class="product-price">{{ item.price }}</span>
            <button class="btn"><router-link to="/user">User-Info</router-link></button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "product",
    data() {
        return {
            Product: []
        }
    },
    props: {
        id: {
            type: String,
            default: () => {
                return "";
            }
        }
    },
    methods: {
        async getdata(id) {
            let result = await axios.get("http://localhost:3000/Product")
            let dataSale = result.data.filter((x) => x.option == id)
            this.Product = dataSale
        }
    },
    mounted() {
        this.getdata(this.id)
    }
}
</script>
<style>
.container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow: hidden;
    justify-items: center;
}

.imgs {
    width: 250px;
    height: 170px;
    object-fit: cover;
    margin: 15px 0px 0px;
}

.img-container {
    display: flex;
    flex-direction: column;
    width: 320px;
    justify-content: center;
    align-items: center;
    border: 1px solid #cac0c0;
    border-radius: 4px;
    margin: 15px 0px;
}

.btn {
    margin: 10px 0px 15px;
    padding: 5px 40px;
    cursor: pointer;
    border-radius: 5px;
    background: black;
    color: white;
    border: none;
    outline: linen;
    font-size: 15px;
    transition: all .4s ease-in-out;
}

.btn:hover {
    background-color: skyblue;
    transition: all .4s ease-in-out;
}

.last {
    margin-right: 15px;
}

.product-price {
    border-bottom: 1px solid #ebdada;
}

.first {
    margin-left: 15px;
}

span {
    padding: 5px 0px;
    font-size: 15px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #ebdada;
}

.btn a {
    text-decoration: none;
    color: white;
}
</style>