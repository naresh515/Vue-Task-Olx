<template>
    <div class="container">
        <div class="img-container first">
            <img class="imgs" :src="Product.photo">
            <input class="file-input" ref="fileInput" type="file" @change="handleImageSelect">

            <span class="product-name">Name: &nbsp; <input type="text" placeholder="Product Name" name="name"
                    v-model="Product.name" />
            </span>
            <span class="product-details">Details: &nbsp; <input type="text" placeholder="Product details" name="details"
                    v-model="Product.details" />
            </span>
            <span class="product-price"><i class="fa-solid fa-indian-rupee-sign"></i> : &nbsp; <input type="number"
                    placeholder="Product price" name="price" v-model="Product.price" />
            </span>
            <select v-model="Product.selectedOption" class="selected">
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
                <option value="services">Services</option>
                <option value="accessories">accessories</option>
            </select>
            <button type="button" v-on:click="update()">Update Product</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'update',
    data() {
        return {
            Product: [],
        }
    },
    methods: {
        handleImageSelect(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.Product.photo = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async getdata() {
            let result = await axios.get("http://localhost:3000/Product/" + this.$route.params.id)
            this.Product = result.data
        },
        async update() {
            const result = await axios.put("http://localhost:3000/Product/" + this.$route.params.id, {
                name: this.Product.name,
                details: this.Product.details,
                price: this.Product.price,
                option: this.Product.selectedOption,
                Uname: this.Product.Uname,
                email: this.Product.email,
                mobile: this.Product.mobile,
                photo: this.Product.photo,

            });
            if (result.status == 200) {
                this.$router.push({ name: 'profile' })
                console.log(result)
            }
        }
    },
    mounted() {
        this.getdata()
    }
}
</script>