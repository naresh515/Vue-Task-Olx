<template>
    <div class="input-fileds">
        <input type="text" placeholder="User Name" name="Uname" v-model="Product.Uname">
        <input name="email" type="text" placeholder="Enter Your Email" v-model="Product.email">
        <input type="number" placeholder="Mobile No." name="mobile" v-model="Product.mobile">
        <input type="text" placeholder="Product Name" name="name" v-model="Product.name">
        <input type="text" placeholder="Product Details" name="details" v-model="Product.details">
        <input type="number" placeholder="Product Price" name="price" v-model="Product.price">
        <input class="file-input" ref="fileInput" type="file" @change="handleImageSelect" @click="chooseImage">
        <select v-model="Product.selectedOption" class="selected">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="services">Services</option>
            <option value="accessories">accessories</option>
        </select>
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
                Uname: '',
                email: '',
                mobile: '',
                name: '',
                details: '',
                price: '',
                photo: '',
                selectedOption: ''
            },
        }
    },
    methods: {
        chooseImage() {
            this.$refs.fileInput.click();
        },
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
            const result = await axios.post("http://localhost:3000/Product", {
                Uname: this.Product.Uname,
                email: this.Product.email,
                mobile: this.Product.mobile,
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
.input-fileds {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px 0px;
}

.input-fileds input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin: 0px auto 30px;
    border: 1px solid lightblue;
    outline: none;
}

.add-btn {
    border: 1px solid lightblue;
    width: 300px;
    height: 40px;
    cursor: pointer;
    background-color: skyblue;
    color: #fff;
}

.selected {
    width: 100px;
    height: 30px;
    margin: 0px 0px 20px;
    border: 1px solid skyblue;
    outline: skyblue;
}
</style>
