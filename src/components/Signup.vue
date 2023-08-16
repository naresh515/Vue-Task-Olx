<template>
    <h1>Signup Page</h1>
    <div class="form">
        <div class="login">
            <label class="name">Fullname : &nbsp;</label>
            <input name="fullname" type="text" placeholder="Enter Your Full Name" v-model="fullname" required>
            <p class="errors">{{ FullnameError }}</p>
        </div>
        <div class="login">
            <label class="name">Email Address : &nbsp;</label>
            <input name="email" type="text" placeholder="Enter Your Email" v-model="email" required>
            <p class="errors">{{ EmailError }}</p>
        </div>
        <div class="login">
            <label class="name">Mobile Number : &nbsp;</label>
            <input type="number" placeholder="Mobile No." name="mobile" v-model="mobile" required>
            <p class="errors">{{ MobileNumberError }}</p>

        </div>
        <div class="login">
            <label class="name">password : &nbsp;</label>
            <input name="password" type="password" placeholder="Enter Your password" v-model="password" required>
            <p class="errors">{{ PasswordError }}</p>
        </div>
        <div class="login">
            <label class="name">Address : &nbsp;</label>
            <input name="Address" type="text" placeholder="Enter Your Address" v-model="Address" required>
        </div>
        <button v-on:click="getData()" class="btn">signup</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "signup",
    data() {
        return {
            fullname: '',
            email: '',
            mobile: '',
            password: '',
            FullnameError: '',
            EmailError: '',
            MobileNumberError: '',
            PasswordError: ''
        }
    },
    methods: {
        async getData() {
            this.FullnameError = ''
            this.EmailError = ''
            this.MobileNumberError = ''
            this.PasswordError = ''

            if (this.fullname == '' || this.fullname.length < 4) {

                this.FullnameError = 'Invalid Name'

            } else if (this.email == '' || !/^\b[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-z][A-Z]{2,4}\b$/i.test(this.email)) {

                this.EmailError = 'Invalid Email'

            } else if (this.mobile == '' || !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.mobile)) {

                this.MobileNumberError = 'Invalid Mobile  Number'

            } else if (this.password == '' || this.password.length < 6) {

                this.PasswordError = 'Invalid Password'

            } else {

                let result = await axios.post("http://localhost:3000/users", {
                    fullname: this.fullname,
                    email: this.email,
                    mobile: this.mobile,
                    password: this.password,
                    Address: this.Address
                });
                if (result.status == 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({ name: 'Home' })
                }
            }
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 0px 0px 20px;
}

.form {
    text-align: center;
    padding: 40px 80px;
    width: 500px;
    margin: 0 auto;
    max-width: 100%;
    background-color: white;
    border-radius: 4px;
    box-shadow: 5px 6px 10px #5f5f5f;
}

div {
    margin: 0px 0px 20px;
}

.name {
    color: black;
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
}

input {
    padding: 10px;
    outline: none;
    border-radius: 12px;
}

.btn {
    border: none;
    cursor: pointer;
    padding: 5px 20px;
    font-size: 15px;
    background: #0000ff7a;
    color: white;
    transition: all .5s ease-in-out;
    border-radius: 12px;
    font-weight: bold;
}

.btn:hover {
    color: black;
    background-color: white;
    transition: all .5s ease-in-out;
}

.log {
    text-decoration: none;
    color: black;
    background: yellowgreen;
    padding: 5px 20px;
    border-radius: 10px;
    float: left;
}

.errors {
    color: red;
    text-transform: capitalize;
}

.login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: start;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .login{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .form {
        width: 90%;
        margin: 0 auto;
        padding: 20px;
    }
}
</style>