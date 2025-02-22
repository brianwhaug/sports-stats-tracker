<template>
  <div>
    <form @submit.prevent="startGame">
      <div>
        <label for="sport">Sport:</label>
        <select v-model="newGameSportType" id="sport">
          <option v-for="sport in sportTypes" :key="sport" :value="sport">{{ sport }}</option>
        </select>
      </div>
      <div>
        <label for="myTeam">My Team:</label>
        <select v-model="newGameMyTeam" id="myTeam">
          <option v-for="team in teams" :key="team.name" :value="team">{{ team.name }}</option>
        </select>
      </div>
      <div>
        <label for="opponentTeam">Opponent Team:</label>
        <select v-model="newGameOpponentTeam" id="opponentTeam">
          <option v-for="team in teams" :key="team.name" :value="team">{{ team.name }}</option>
        </select>
      </div>
      <div>
        <label for="newGameStatBundle">Stat Bundle:</label>
        <select v-model="newGameStatBundle" id="newGameStatBundle">
          <option v-for="bundle in statBundles" :key="bundle.name" :value="bundle">{{ bundle.name }}</option>
        </select>
      </div>
      <div>
        <label for="newGameLocation">Location:</label>
        <input type="text" v-model="newGameLocation" id="location" />
      </div>
      <button type="submit">Create Game</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStatsStore, SportType, ManagedTeam, Game, StatBundle } from '@stores/game-stats-data-store';

const router = useRouter();
const gameStatsStore = useGameStatsStore();

// setup data elements from the store
const sportTypes = Object.values(SportType);
const teams = gameStatsStore.teams;
const statBundles = gameStatsStore.stats;

// declare bindings for the form
const newGameSportType = ref<SportType | null>(null);
const newGameMyTeam = ref<ManagedTeam | null>(null);
const newGameOpponentTeam = ref<ManagedTeam | null>(null);
const newGameLocation = ref<string>('');
const newGameStatBundle = ref<StatBundle | null>(null);

const startGame = () => {
  if (newGameSportType.value && newGameMyTeam.value && newGameOpponentTeam.value && newGameLocation.value && newGameStatBundle.value) {

    function deepCopy(obj: any) {
      return JSON.parse(JSON.stringify(obj));
    }
    
    // copy the players and stats to the new game
    const myTeam = deepCopy(newGameMyTeam.value);
    const opponentTeam = deepCopy(newGameOpponentTeam.value);
    
    // for every player on my team, copy the desired stats for each Player
    for (const player of Object.values(myTeam.players)) {
      if (player && typeof player === 'object') {
        const stats = newGameStatBundle.value ? deepCopy(newGameStatBundle.value.stats) : [];
        (player as any).stats = stats;
      }
    }
    
    // for every player on the opponent team, copy the desired stats for each Player
    for (const player of Object.values(opponentTeam.players)) {
      if (player && typeof player === 'object') {
        const stats = newGameStatBundle.value ? deepCopy(newGameStatBundle.value.stats) : [];
        (player as any).stats = stats;
      }
    }

    // create a new Game instance and store as the active game
    const newGame: Game = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      sportType: newGameSportType.value,
      location: newGameLocation.value,
      myTeam: myTeam,
      opponentTeam: opponentTeam,
      statBundleName: newGameStatBundle.value?.name || ''
    };
    gameStatsStore.activeGame = newGame;
    
    // navigate to the run game page
    router.push('/rungame');
  } else {
    alert('Please fill in all fields');
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input, select {
  padding: 5px;
  font-size: 1em;
}

button {
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>