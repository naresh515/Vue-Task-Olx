<template>
    <div class="sale-container product" v-if="filterProduct.length > 0">
        <div class="top-container" v-if="obj.key">
            <h1>{{ obj.title }}</h1>
            <button type="button" class="button">
                <router-link :to="'/products/' + obj.key">More Details</router-link>
            </button>
        </div>
        <div class="container grid">
            <VueAIcarousel :Property="{ ID: 'Unique_id_' + obj.key, Dlay: 1000 }" v-if="filterProduct.length >= 5"
                class="flow">
                <div class="img-container first" v-for="item in filterProduct" :key="item.name">
                    <img class="imgs" :src="item.photo">
                    <span class="product-name">Name : &nbsp; <p>{{ item.name }}</p></span>
                    <span class="product-details">Details : &nbsp; <p> {{ item.details }}</p></span>
                    <span class="product-price">
                        <p><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp; :</p> &nbsp; {{ item.price
                        }}
                    </span>
                    <button class="btn"><router-link :to="'/user/' + item.id">Buy</router-link></button>
                </div>
            </VueAIcarousel>
            <div class="img-container first flow1" v-else v-for="item in filterProduct" :key="item.name">
                <img class="imgs" :src="item.photo" />
                <span class="product-name">Name : &nbsp; <p>{{ item.name }}</p></span>
                <span class="product-details">Details : &nbsp; <p> {{ item.details }}</p> </span>
                <span class="product-price">
                    <p><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp; :</p> &nbsp;
                    {{ item.price }}
                </span>
                <button class="btn">
                    <router-link :to="'/user/' + item.id">Buy</router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import VueAIcarousel from "vue-ai-carousel"

export default {
    name: "product",
    components: {
        VueAIcarousel
    },
    data() {
        return {
            Product: [],
            searchQuery: "",
            settings: {
                autoplay: true,
                infinite: true,
            },
        };
    },
    props: {
        id: {
            type: String,
            default: () => {
                return "";
            },
        },
        obj: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    methods: {
        getdata(id) {
            axios
                .get("http://localhost:3000/Product")
                .then((response) => {
                    let dataSale = response.data.filter((x) => x.option == id);
                    this.Product = dataSale;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        handleSearchQueryChange(searchQuery) {
            this.searchQuery = searchQuery;
        },
    },
    mounted() {
        this.getdata(this.id);
    },
    computed: {
        filterProduct() {
            return this.Product.filter((product) => {
                return product.name
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase());
            });
        },
    },
    created() {
        this.handleSearchQueryChange(this.$route.query.search || "");
    },
    watch: {
        "$route.query.search"(newSearchQuery) {
            this.handleSearchQueryChange(newSearchQuery);
        },
    },
};
</script>
<style>
.grid {
    display: flex;
    width: 99%;
    max-width: 100%;
    overflow: hidden;
}

.flow {

    display: flex;
    width: 100%;
    overflow: hidden;
    justify-items: center;
}

.imgs {
    width: 250px;
    height: 170px;
    object-fit: cover;
    margin: 15px 0px;
}

.img-container {
    display: flex;
    flex-direction: column;
    width: 320px !important;
    justify-content: center;
    align-items: center;
    border: 1px solid #cac0c0;
    border-radius: 4px !important;
    margin: 15px 0px;
    height: auto !important;
    color: unset !important;
    background-color: unset !important;
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
    transition: all 0.4s ease-in-out;
}

.btn:hover {
    background-color: skyblue;
    transition: all 0.4s ease-in-out;
}

.last {
    margin-right: 15px;
}

.product-price {
    border-bottom: 1px solid #ebdada;
}

.first {
    margin-left: 15px !important;
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

.button {
    border: none;
    background-color: skyblue;
    border-radius: 5px;
    padding: 10px 15px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
}

.button a {
    text-decoration: none;
    color: white;
}

.button:hover {
    background-color: black;
    transition: all 0.5s ease-in-out;
}

.top-container {
    display: flex;
    justify-content: space-between;
    margin: 15px 30px;
}

.product {
    border: 1px solid #cfcfcf;
    margin: 10px;
    border-radius: 10px;
}

.lC3oC2kE3bD2fB1jC2qB4eF1v div {
    margin: auto !important;
    margin-bottom: 15px !important;
    margin-left: 15px !important;
}

.vR2lC1dN2bD1xN1vB3rD1hF1d {
    transform: translateX(0px) !important;
}

.countDefaultpos {
    display: none !important;
}

.PeVNCommon {
    background-color: transparent !important;
}

.product-name,
.product-details,
.product-price {
    display: grid;
    grid-template-columns: 20% 60%;
    justify-content: center;
    align-items: center;
    justify-items: center;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .top-container {
        margin: 10px;
    }

    h1 {
        font-size: 17px;
    }

    .grid {
        flex-direction: column;
    }

    .img-container {
        width: 300px !important;
        margin: 0 auto;
    }

    .first {
        margin-left: 0px !important;
    }

    .product-name,
    .product-details,
    .product-price {
        display: flex;
        justify-content: space-evenly;
    }

    .flow1 {
        margin-bottom: 20px;
    }
}
</style>
