<template>
  <div class="games-table">
    <EasyDataTable
      :headers="gameStatsStore.getEasyTableGamesListHeaders"
      :items="gameStatsStore.getEasyDataTableGamesList"
      alternating
      border-cell
      table-class-name="customize-table"
      header-text-direction="left"
      body-text-direction="left"
      :rows-per-page="100"
    />
  </div>
</template>

<script lang="ts" setup>
import { useGameStatsStore } from '@stores/game-stats-data-store';

const gameStatsStore = useGameStatsStore();

defineOptions({
  name: "GamesList",
});
</script>

<style lang="scss">
.customize-table {
  table thead tr th {
    vertical-align: top;
    text-align: left;
  }
  table {
    tbody {
      tr {
        td {
          vertical-align: top;
          text-align: left;
        }
      }
    }
  }
}
</style>