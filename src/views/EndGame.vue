<template>
  <div class="endgame-container">
    <h1>Game Summary</h1>
    <div class="team-summary">
      <h2>{{ myTeam.name }}</h2>
      <table class="stats-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Points</th>
            <th v-for="stat in statNames" :key="stat">{{ stat }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in myTeam.players" :key="player.jerseyNumber">
            <td>#{{ player.jerseyNumber }} - {{ player.name }}</td>
            <td>{{ player.totalPoints }}</td>
            <td v-for="stat in statNames" :key="stat">{{ getPlayerStat(player, stat) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div class="team-summary">
        <h2>{{ opponentTeam.name }}</h2>
        <table class="stats-table">
            <thead>
            <tr>
                <th>Player</th>
                <th>Total Points</th>
                <th v-for="stat in statNames" :key="stat">{{ stat }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="player in opponentTeam.players" :key="player.jerseyNumber">
                <td>#{{ player.jerseyNumber }} - {{ player.name }}</td>
                <td>{{ player.totalPoints }}</td>
                <td v-for="stat in statNames" :key="stat">{{ getPlayerStat(player, stat) }}</td>
            </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useGameStatsStore, ManagedTeam } from '@stores/game-stats-data-store';

const gameStatsStore = useGameStatsStore();
const activeGame = gameStatsStore.activeGame;

const myTeam = (activeGame?.myTeam ?? {} as ManagedTeam); 
const opponentTeam = (activeGame?.opponentTeam ?? {} as ManagedTeam);

const statNames = ref(['Fouls', 'Rebounds','Assists','Turnovers']); // Add more stat names as needed

const getPlayerStat = (player: { stats?: { name: string, value: number }[] }, statName: string) => {
  const stat = player.stats?.find((s: { name: string, value: number }) => s.name === statName);
  return stat ? stat.value : 0;
};
</script>

<style lang="scss" scoped>
.endgame-container {
  padding: 20px;
}

.team-summary {
  margin-bottom: 40px;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th, .stats-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.stats-table th {
  background-color: #f4f4f4;
}
</style>
