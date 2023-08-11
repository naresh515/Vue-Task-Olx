<template>
    <div class="sale-container product" v-if="filterProduct.length > 0">
        <div class="top-container" v-if="obj.key">
            <h1>{{ obj.title }}</h1>
            <button type="button" class="button"><router-link :to="'/products/' + obj.key">More
                    Details</router-link></button>
        </div>
        <div class="container grid">
            <!-- <Carousel v-if="filterProduct.length >= 6" :setting="settings">
                <Slide :key="name">
                    <div class="img-container first" v-for="item in filterProduct" :key="item.name">
                        <img class="imgs" :src="item.photo">
                        <span class="product-name">Name : &nbsp; {{ item.name }}</span>
                        <span class="product-details">Details : &nbsp; {{ item.details }}</span>
                        <span class="product-price"><i class="fa-solid fa-indian-rupee-sign"></i> : &nbsp; {{ item.price
                        }}</span>
                        <button class="btn"><router-link :to="'/user/' + item.id">Buy</router-link></button>
                    </div>
                </Slide>
            </Carousel> -->
            <div class="img-container first" v-for="item in filterProduct" :key="item.name">
                <img class="imgs" :src="item.photo">
                <span class="product-name">Name : &nbsp; {{ item.name }}</span>
                <span class="product-details">Details : &nbsp; {{ item.details }}</span>
                <span class="product-price"><i class="fa-solid fa-indian-rupee-sign"></i> : &nbsp; {{ item.price
                }}</span>
                <button class="btn"><router-link :to="'/user/' + item.id">Buy</router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from 'vue3-carousel'

export default {
    name: "product",
    components: {
        Carousel,
        Slide,
    },
    data() {
        return {
            Product: [],
            searchQuery: '',
            settings: {
                "autoplay": true,
                "infinite": true
            }
        }
    },
    props: {
        id: {
            type: String,
            default: () => {
                return "";
            }
        },
        obj: {
            type: Object,
            default: () => {
                return {}
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
    display: flex;
    width: 100%;
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

.button {
    border: none;
    background-color: skyblue;
    border-radius: 5px;
    padding: 10px 15px;
    transition: all .5s ease-in-out;
    cursor: pointer;
}

.button a {
    text-decoration: none;
    color: white;
}

.button:hover {
    background-color: black;
    transition: all .5s ease-in-out;
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

li.carousel__slide.carousel__slide--visible.carousel__slide--active {
    display: flex;
    overflow: hidden;
}

.carousel__liveregion.carousel__sr-only {
    display: none;
}

ol.carousel__track {
    margin: 0px !important;
    padding: 0px;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>