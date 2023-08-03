<template>
    <h1>Signup Page</h1>
    <div class="form">
        <div>
            <label class="name">Fullname : &nbsp;</label>
            <input name="fullname" type="text" placeholder="Enter Your Full Name" v-model="fullname" required>
            <span v-for="error in error" class="errors">{{ error }}</span>
        </div>
        <div>
            <label class="name">Email Address : &nbsp;</label>
            <input name="email" type="text" placeholder="Enter Your Email" v-model="email" required>
            <span v-for="error in error" class="errors">{{ error }}</span>
        </div>
        <div>
            <label class="name">Mobile Number : &nbsp;</label>
            <input type="number" placeholder="Mobile No." name="mobile" v-model="mobile" required>
            <span v-for="error in error" class="errors">{{ error }}</span>

        </div>
        <div>
            <label class="name">password : &nbsp;</label>
            <input name="password" type="password" placeholder="Enter Your password" v-model="password" required>
            <span v-for="error in error" class="errors">{{ error }}</span>
        </div>
        <button v-on:click="getData()" class="btn">signup</button>
        <div>
            <p>
                <Router-link to="/login" class="log">Login</Router-link>
            </p>
        </div>
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
            // error: []
        }
    },
    methods: {
        async getData() {
            var pattern = /^\b[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-z][A-Z]{2,4}\b$/i;
            if (this.fullname == '' || this.fullname.length < 4) {

                alert("name")

            } else if (this.email == '' || this.email != pattern) {

                alert("email")

            } else if (this.mobile == '' || this.mobile.length < 10 || this.mobile.length > 10) {

                alert("mobile")

            } else if (this.password == '' || this.password.length <= 8) {

                alert("password")

            } else {

                let result = await axios.post("http://localhost:3000/users", {
                    fullname: this.fullname,
                    email: this.email,
                    mobile: this.mobile,
                    password: this.password
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
    background-color: #666666;
    border-radius: 4px;
}

div {
    margin: 0px 0px 20px;
}

.name {
    color: white;
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
</style>