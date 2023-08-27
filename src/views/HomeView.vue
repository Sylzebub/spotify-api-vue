<template>
  <div class="home">
    <SpotifyAPI />
  </div>
</template>

<script>
import SpotifyAPI from "../components/SpotifyAPI.vue";

export default {
  name: "HomeView",
  components: {
    SpotifyAPI,
  },
};
</script>
