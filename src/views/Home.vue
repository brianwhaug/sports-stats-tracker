<template>
    <div id="nav" class="app-router-bar">
        <router-link to="/newgame">New Game</router-link>
        <router-link to="/">Manage Teams</router-link>
        <router-link to="/">Manage Stats</router-link>
    </div>
    <div>
        <GamesList></GamesList>
    </div>
</template>
  
<script lang="ts" setup>
  import { useRouter } from "vue-router";
  import GamesList from "@components/GamesList.vue";

  const router = useRouter();
   
</script>

<style lang="scss" scoped>
.app-router-bar {
    display: flex;
    align-items: left;
    justify-content: space-between;
    background-color: #d3d3d3;
    border: 1px solid #ced4da;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  
    a,
    button {
      text-decoration: none;
      color: #445269;
      padding: 5px 10px;
      margin: 0 10px;
      border-radius: 10px;
      flex-grow: 1;
      text-align: center;
      background-color: #f8f9fa;
  
      &.router-link-exact-active {
        color: #ffffff;
        font-weight: bold;
        background-color: #445269;
      }
  
      &.reset {
        background-color: #ffbfbd;
      }
    }
  }
</style>  