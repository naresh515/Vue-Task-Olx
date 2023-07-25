<template>
    <div class="" v-for="item in items">
        <div class="sale-container product">
            <div class="top-container">
                <h1>{{ item.title }}</h1>
                <button type="button" class="button"><router-link :to="'/products/' + item.key">More
                        Details</router-link></button>
            </div>
            <product :id="item.key" />
        </div>
    </div>
</template>
<script>
import product from "./product.vue"
export default {
    name: "Home",
    data() {
        return {

            items: [{
                key: 'sale',
                title: "Sale Products"
            },
            {
                key: 'rent',
                title: "Rent Products"
            },
            {
                key: 'services',
                title: "Services Products"
            },
            {
                key: 'accessories',
                title: "Accessories Products"
            }
            ]
        }
    },
    components: {
        product
    }
}

</script>
<style scoped>
.button {
    border: none;
    background-color: skyblue;
    border-radius: 5px;
    padding: 10px 15px;
    transition: all .5s ease-in-out;
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
</style>


