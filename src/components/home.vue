<template>
    <div class="items" v-for="item in items" v-if="items.length > 0">
        <product :id="item.key" :obj="item" />
    </div>
</template>

<script>
import product from "./product.vue";
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
.items {
    width: 98%;
    margin: 30px auto 0px;
}
</style>


