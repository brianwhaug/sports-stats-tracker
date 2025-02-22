<template>
  <div class="game-container">
    <div class="team-column">
      <h2>{{ myTeam.name }}</h2>
      <table class="team-stat-table">
        <thead>
          <tr>
            <th>Total Score</th>
            <th>Total Fouls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ calculateTotalPoints(myTeam) }}</td>
            <td>{{ calculateTotalForStat(myTeam, 'Fouls') }}</td>
          </tr>
        </tbody>
      </table>
      <div v-for="player in myTeam.players" :key="player.jerseyNumber" class="player-card" @click="selectPlayer(player, myTeam)">
        <p>#{{ player.jerseyNumber }} - {{ player.name }}</p>
      </div>
    </div>
    <div class="team-column">
      <h2>{{ opponentTeam.name }}</h2>
      <table class="team-stat-table">
        <thead>
          <tr>
            <th>Total Score</th>
            <th>Total Fouls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ calculateTotalPoints(opponentTeam) }}</td>
            <td>{{ calculateTotalForStat(opponentTeam, 'Fouls') }}</td>
          </tr>
        </tbody>
      </table>
      <div v-for="player in opponentTeam.players" :key="player.jerseyNumber" class="player-card" @click="selectPlayer(player, opponentTeam)">
        <p>#{{ player.jerseyNumber }} - {{ player.name }}</p>
      </div>
    </div>  
  </div>
  <div>
    <button @click="endGame">End Game</button>
  </div>
  <div v-if="selectedPlayer" class="player-popup">
    <div class="popup-content">
      <h3>#{{ selectedPlayer.jerseyNumber }} ({{ selectedPlayer.name }}'s) Stats</h3>
      <div v-for="stat in selectedPlayer.stats" :key="stat.name">
        <label :for="stat.name">{{ stat.name }} - {{ stat.value }}&nbsp;&nbsp;</label>
        <button @click="incrementStat(stat)">+</button>&nbsp;
        <button @click="decrementStat(stat)">-</button>
      </div>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStatsStore, SportType, ManagedTeam, Game, Player, Stat } from '@stores/game-stats-data-store';

const router = useRouter();
const gameStatsStore = useGameStatsStore();

const activeGame = gameStatsStore.activeGame;
const myTeam = ref<ManagedTeam>(activeGame?.myTeam ?? {} as ManagedTeam); 
const opponentTeam = ref<ManagedTeam>(activeGame?.opponentTeam ?? {} as ManagedTeam);

const selectedPlayer = ref<Player | null>(null);

const selectPlayer = (player: Player, team: ManagedTeam) => {
  selectedPlayer.value = player;
};

const incrementStat = (stat: Stat) => {
    stat.value += stat.incrementBy;
    if (selectedPlayer.value && stat.incrementTotalScoreBy) {
      selectedPlayer.value.totalPoints = (selectedPlayer.value.totalPoints ?? 0) + stat.incrementTotalScoreBy;
    }   
    console.log('Incrementing stats:', stat);
};

const decrementStat = (stat: Stat) => {
  stat.value -= stat.incrementBy;
  if (selectedPlayer.value && stat.incrementTotalScoreBy) {
      selectedPlayer.value.totalPoints = (selectedPlayer.value.totalPoints ?? 0) + stat.incrementTotalScoreBy;
  }
  console.log('Decrementing stats:', stat);
};  

// loop thru all the players on a team and add up their total points and return value
const calculateTotalPoints = (team: ManagedTeam) => {
  let totalPoints = 0;
  team.players.forEach(player => {
    totalPoints += player.totalPoints ?? 0;
  });
  return totalPoints;
};

const calculateTotalForStat = (team: ManagedTeam, statName: string) => {
  let total = 0;
  team.players.forEach(player => {
    const stat = player.stats?.find(s => s.name === statName);
    if (stat) {
      total += stat.value ?? 0;
    }
  });
  return total;
};

const closePopup = () => {
  selectedPlayer.value = null;
};

const endGame = () => {
  if (activeGame) {
    gameStatsStore.games.push(activeGame);
    router.push({ path: "/endgame" });
  }
};
</script>

<style lang="scss" scoped>
.game-container {
  display: flex;
  justify-content: space-between;
}

.team-column {
  width: 45%;
}

.team-stat-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.team-stat-table th, .team-stat-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.team-stat-table th {
  background-color: #f4f4f4;
}

.player-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.player-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-content {
  display: flex;
  flex-direction: column;
}

.popup-content label {
  margin-top: 10px;
}

.popup-content input {
  margin-top: 5px;
}

.popup-content button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #0056b3;
}

button {
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>