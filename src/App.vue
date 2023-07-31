<template>
  <Header @search="handlesearch" />
  <router-view />
</template>
<script>
import Header from './components/Header.vue';
import signup from './components/Signup.vue';
export default {
  name: "App",
  components: { signup, Header },
  methods: {
    handlesearch(searchQuery) {
      this.$router.push({ name: this.$route.name, query: { search: searchQuery } });
    }
  }
}
</script>