<template>
    <div class="cards">
        <div class="userName user">Name: &nbsp; <p>{{ store.fullname }}</p>
        </div>
        <div class="userEmail user">Email: &nbsp;<p> {{ store.email }}</p>
        </div>
        <div class="userMobile user">Mobile: &nbsp; <p>{{ store.mobile }}</p>
        </div>
        <div class="userAddress user">Address: &nbsp;<p>{{ store.Address }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'myprofile',
    data() {
        return {
            store: []
        }
    },
    props: {
        store: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
}
</script>
<style scoped>
.cards {
    margin: 10px 20px 0px;
}

.user {
    display: grid;
    grid-template-columns: 20% 60%;
    justify-content: center;
}
</style>