<template>
    <h1>Add new post</h1>
    <div class="input-fileds">
        <input type="text" placeholder="Product Name" name="name" v-model="Product.name">
        <input type="text" placeholder="Product Details" name="details" v-model="Product.details">
        <input type="number" placeholder="Product Price" name="price" v-model="Product.price">
        <input class="file-input" ref="fileInput" type="file" @change="handleImageSelect">
        <select v-model="Product.selectedOption" class="selected">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="services">Services</option>
            <option value="accessories">accessories</option>
        </select>
    </div>
    <div class="btn-sub">
        <button type="submit" v-on:click="add()" class="add-btn">Add Item</button>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "input",
    data() {
        return {
            Product: {
                name: '',
                details: '',
                price: '',
                photo: '',
                selectedOption: ''
            },
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
        async add() {
            const datastore = JSON.parse(localStorage.getItem("user-info"))
            var userInfo = datastore[0];
            var fullname = userInfo.fullname;
            var email = userInfo.email
            var mobile = userInfo.mobile
            var Address = userInfo.Address
            const result = await axios.post("http://localhost:3000/Product", {
                Uname: fullname,
                email: email,
                mobile: mobile,
                Address: Address,
                name: this.Product.name,
                details: this.Product.details,
                price: this.Product.price,
                photo: this.Product.photo,
                option: this.Product.selectedOption
            });
            if (result.status == 201) {
                this.$router.push({ name: 'Home' });
            }
        }
    }
}
</script>
<style scoped>
h1 {
    padding-left: 80px;
    font-weight: 600;
    font-family: sans-serif;
    text-transform: capitalize;
    margin: 20px auto 0px;
    width: 98%;
}

.input-fileds {
    justify-content: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    margin: 50px auto 30px;
    width: 98%;
}

.input-fileds input,
.selected {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin: 0px auto 30px;
    border: 1px solid lightblue;
    outline: none;
}

.btn-sub {
    width: 100%;
    text-align: center;
}

.add-btn {
    border: 1px solid lightblue;
    width: 300px;
    height: 40px;
    cursor: pointer;
    background-color: skyblue;
    color: #fff;
    margin: 0px auto;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .input-fileds {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
