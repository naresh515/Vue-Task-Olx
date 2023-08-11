<template>
    <h1>Login Page</h1>
    <div class="form">
        <div class="login">
            <label class="name">Email Address : &nbsp;</label>
            <input name="email" type="text" placeholder="Enter Your Email" v-model="email" />
            <p class="errors">{{ EmailError }}</p>
        </div>
        <div class="login">
            <label class="name">password : &nbsp;</label>
            <input name="password" type="password" placeholder="Enter Your password" v-model="password" />
            <p class="errors">{{ PasswordError }}</p>
        </div>
        <div class="err">
            <p class="errors">{{ allerror }}</p>
        </div>
        <button v-on:click="login()" class="btn" type="submit">Login</button>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            EmailError: "",
            PasswordError: "",
            allerror: "",
        };
    },
    methods: {
        async login() {
            this.EmailError = "";
            this.PasswordError = "";
            this.allerror = "";
            if (this.email == "") {
                this.EmailError = "Invalid Email";
            }

            if (this.password == "") {
                this.PasswordError = "Invalid Password";
            }

            try {
                let result = await axios.get(
                    `http://localhost:3000/users?email=${this.email}&password=${this.password}`
                );
                if (result.status == 200 && result.data.length > 0) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({ name: "Home" });
                } else {
                    this.allerror = "Invalid Details";
                }
            } catch {
                console.log(error);
            }
        },
    },
};
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
    transition: all 0.5s ease-in-out;
    border-radius: 12px;
    font-weight: bold;
}

.btn:hover {
    color: black;
    background-color: white;
    transition: all 0.5s ease-in-out;
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
</style>
