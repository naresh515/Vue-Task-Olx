<template>
    <div class="content">
        <table>
            <tr>
                <td class="heading">Image</td>
                <td class="heading">product-name</td>
                <td class="heading">product-details</td>
                <td class="heading">product-price</td>
                <td class="heading">Actions</td>
            </tr>

            <tr v-for="item in product">
                <td class="text"> <img class="imgs" :src="item.photo"></td>
                <td class="text">{{ item.name }}</td>
                <td class="text">{{ item.details }}</td>
                <td class="text">{{ item.price }}</td>

                <td class="actions">
                    <router-link :to="'/update/' + item.id">Update</router-link> &nbsp;/ &nbsp;
                    <button type="submit" v-on:click="deleteRestro(item.id)" class="action-btn">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'myProduct',
    data() {
        return {
            product: [],
        }
    },
    props: {
        product: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        async deleteRestro(id) {
            let result = await axios.delete("http://localhost:3000/Product/" + id)
            if (result.status == 200) {
                this.$router.push({ name: 'Home' })
            }
        },
    }
}
</script>
<style>
.content {
    margin-top: 65px;
}

.cards {
    width: 350px;
    max-width: 100%;
    border: 1px solid #cac0c0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    background-color: #333;
    cursor: pointer;
    transition: all .5s ease-in-out;
    margin: 50px auto 0px;
}

.user {
    width: 100%;
    padding: 15px 20px;
    color: white;
}

table {
    margin-left: 20px;
    width: 100%;
}

.heading {
    font-family: sans-serif;
    text-transform: capitalize;
    font-weight: 800;
    text-align: center;
    width: 230px;
    max-width: 100%;
}

.text {
    font-family: sans-serif;
    text-transform: capitalize;
    font-weight: 600;
    text-align: center;
}

.imgs {
    width: 220px;
}

.actions {
    text-align: center;
}

.action-btn {
    width: 65px;
    height: 30px;
    max-width: 100%;
    border: 1px solid skyblue;
    background: skyblue;
    color: #fff;
    cursor: pointer;
    float: right;
    margin-right: 20px;
}

.actions a {
    text-decoration: none;
    float: left;
    padding-left: 20px;
}

.actions a:hover {
    background-color: unset;
}

table {
    width: 100%;
    border: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

@media screen and (min-width: 320px) and (max-width: 800px) {
    .content {
        width: 100%;
        overflow-x: auto;
        margin: 0 auto;
    }

    .imgs {
        width: 150px;
        height: 100px;
    }
}
</style>