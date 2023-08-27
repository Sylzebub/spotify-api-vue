<template>
  <div>
    <retrieve-songs-button-vue
      @call-api="makeAPICall"
    ></retrieve-songs-button-vue>
    <div>
      <label for="country-select">Select Country:</label>
      <select id="country-select" v-model="selectedCountry">
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <div v-if="songs.length">
      <h2>List of Songs:</h2>
      <ul>
        <li v-for="song in songs" :key="song.id">
          {{ song.name }} - {{ song.artists[0].name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No songs available</p>
    </div>
  </div>
</template>

<script>
import RetrieveSongsButtonVue from "./RetrieveSongsButton.vue";
import axios from "axios";
import creds from "../../creds.json";

export default {
  components: {
    RetrieveSongsButtonVue,
  },
  data() {
    return {
      songs: [],
      countries: [
        { code: "RO", name: "Romania" },
        { code: "NL", name: "The Netherlands" },
        { code: "BE", name: "Belgium" },
        { code: "GB", name: "United Kingdom" },
        { code: "DE", name: "Germany" },
        { code: "IT", name: "Italy" },
        { code: "SE", name: "Sweden" },
        { code: "NO", name: "Norway" },
        { code: "ES", name: "Spain" },
        { code: "HU", name: "Hungary" },
        { code: "FR", name: "France" },
        { code: "PT", name: "Portugal" },
        { code: "PL", name: "Poland" },
        { code: "FI", name: "Finland" },
      ],
      selectedCountry: "NL",
    };
  },
  methods: {
    async makeAPICall() {
      const clientId = creds.CLIENT_ID;
      const clientSecret = creds.CLIENT_SECRET;

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            auth: {
              username: clientId,
              password: clientSecret,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = response.data.access_token;

        if (accessToken) {
          const country = this.selectedCountry;

          const playlistResponse = await axios.get(
            "https://api.spotify.com/v1/browse/featured-playlists",
            {
              params: {
                country: country,
                limit: 1,
                offset: 0,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const playlistId = playlistResponse.data.playlists.items[0].id;

          const tracksResponse = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
              params: {
                limit: 30,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log("Tracks response:", tracksResponse);
          console.log("Data:", tracksResponse.data);

          this.songs = tracksResponse.data.items.map((item) => item.track);
          console.log("List of songs:", this.songs);
        }
      } catch (error) {
        console.error("Error making Spotify API request!:", error);
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
