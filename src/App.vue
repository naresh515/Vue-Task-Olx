<template>
  <Header />
  <router-view />
</template>
<script>
import Header from './components/Header.vue';
import signup from './components/Signup.vue';
export default {
  name: "App",
  components: { signup, Header }
}

</script>