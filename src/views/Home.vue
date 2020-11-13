<template>
  <div class="home">
    <h1 class="home__site-title">codeChallenge</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue { }
</script>

<style scoped>
.home__site-title {
  font-family: "Lobster";
}
</style>
