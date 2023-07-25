<template>
    <h1>Login Page</h1>
    <div class="form">
        <div>
            <label class="name">Email Add. : &nbsp;</label>
            <input name="email" type="text" placeholder="Enter Your Email" v-model="email">
        </div>
        <div>
            <label class="name">password : &nbsp;</label>
            <input name="password" type="password" placeholder="Enter Your password" v-model="password">
        </div>
        <button v-on:click="login()" class="btn">Login</button>
        <div>
            <p>
                <Router-link to="/signup" class="log">Signup</Router-link>
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "login",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}`
            );
            console.log(result)
            if (result.status == 200 && result.data.length > 0) {
                localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                this.$router.push({ name: 'Home' });
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
    box-shadow: 5px 6px 10px #221e1e;
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