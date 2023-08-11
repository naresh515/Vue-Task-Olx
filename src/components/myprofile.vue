<template>
    <div class="cards">
        <div class="userName user">Name: &nbsp; {{ store.fullname }}</div>
        <div class="userEmail user">Email: &nbsp; {{ store.email }}</div>
        <div class="userMobile user">Mobile: &nbsp; {{ store.mobile }}</div>
        <div class="userAddress user">Address: &nbsp; {{ store.Address }}</div>
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
    margin: 0px 20px;
}
</style>