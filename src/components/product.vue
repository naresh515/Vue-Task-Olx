<template>
    <div class="container grid">
        <div class="img-container first" v-for="item in filterProduct" :key="item.name">
            <img class="imgs" :src="item.photo">
            <span class="product-name">Name : &nbsp; {{ item.name }}</span>
            <span class="product-details">Details : &nbsp; {{ item.details }}</span>
            <span class="product-price"><i class="fa-solid fa-indian-rupee-sign"></i> : &nbsp; {{ item.price }}</span>
            <button class="btn"><router-link :to="'/user/' + item.id">User-Info</router-link></button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "product",
    data() {
        return {
            Product: [],
            searchQuery: ''
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
        getdata(id) {
            axios.get("http://localhost:3000/Product")
                .then(response => {
                    let dataSale = response.data.filter((x) => x.option == id)
                    this.Product = dataSale;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        handleSearchQueryChange(searchQuery) {
            this.searchQuery = searchQuery;
        },
    },
    mounted() {
        this.getdata(this.id)

    },
    computed: {
        filterProduct() {
            return this.Product.filter(product => {
                return product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            })
        }
    },
    created() {
        this.handleSearchQueryChange(this.$route.query.search || "");
    },
    watch: {
        '$route.query.search'(newSearchQuery) {
            this.handleSearchQueryChange(newSearchQuery);
        }
    },
}
</script>
<style>
.grid {
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