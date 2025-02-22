<template>
  <div>
    <router-view></router-view>
  </div>
  <div class="footer-bar">
    Brought to you by: Happy Viking Software
    <div class="version-text">Version 1.0</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStatsStore } from '@stores/game-stats-data-store';

const gameStatsStore = useGameStatsStore();
const router = useRouter();

onMounted(() => {
  // temporary for initial development
  gameStatsStore.loadTestingData();
  router.push({ path: "/" });
});
</script>

<style lang="scss" scoped>
.footer-bar {
    display: flex;
    align-items: left;
    justify-content: space-between;
    background-color: #d3d3d3;
    border: 1px solid #ced4da;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
.version-text {
  text-align: right;
}
</style>
