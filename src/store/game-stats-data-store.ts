import { toRaw } from "vue";
import { defineStore } from 'pinia';

// Imported for its type
import type { Header, Item } from "vue3-easy-data-table";

export interface GameStatsDataState {
  teams: ManagedTeam[];
  stats: StatBundle[];
  games: Game[];
  activeGame?: Game | null;
}

export interface StatBundle {
  stats: Stat[];
  name: string;
  sportType: SportType;
}

export interface Stat {
  name: string;
  value: number;
  incrementBy: number;
  incrementTotalScoreBy?: number;
}

export interface Season {
  name: string;
  team: ManagedTeam;
  statBundle: StatBundle;
}

export interface Game {
  id: string;
  season?: Season;
  date: string;
  sportType: SportType;
  location: string;
  myTeam: ManagedTeam;
  opponentTeam: ManagedTeam;
  statBundleName: string;
}

export interface ManagedTeam {
  name: string;
  sportType: SportType;
  players: Player[];
  favoriteTeam?: boolean;
  inactive?: boolean;
  totalScore?: number;
}

export interface Player { 
  name?: string;
  jerseyNumber: string;
  position?: PositionType;
  stats?: Stat[];
  totalPoints?: number;
}

export enum SportType {
  Basketball = "Basketball",
  Baseball = "Baseball",
  Football = "Football",
}

export type PositionType = BasketballPositionType | BaseballPositionType | FootballPositionType;

export enum BaseballPositionType {
  Pitcher = "Pitcher",
  Catcher = "Catcher",
  FirstBase = "FirstBase",
  SecondBase = "SecondBase",
  ThirdBase = "ThirdBase",
  ShortStop = "ShortStop",
  LeftField = "LeftField",
  CenterField = "CenterField",
  RightField = "RightField",
}

export enum BasketballPositionType {
  PointGuard = "PointGuard",
  ShootingGuard = "ShootingGuard",
  SmallForward = "SmallForward",
  PowerForward = "PowerForward",
  Center = "Center",
}

export enum FootballPositionType {
  Quarterback = "Quarterback",
  RunningBack = "RunningBack",
  WideReceiver = "WideReceiver",
  TightEnd = "TightEnd",
  OffensiveLine = "OffensiveLine",
  DefensiveLine = "DefensiveLine",
  Linebacker = "Linebacker",
  DefensiveBack = "DefensiveBack",
  SpecialTeams = "SpecialTeams",
}

export const useGameStatsStore = defineStore('game-stats-store', {
  state: (): GameStatsDataState => ({
    teams: [],
    stats: [],
    games: [],
  }),
  getters: {
    getEasyTableGamesListHeaders(): Header[] {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Date', value: 'date' },
        { text: 'Sport', value: 'sportType' },
        { text: 'Location', value: 'location' },
      ];
    },
    getEasyDataTableGamesList(state) {
      let items: Item[] = [];
    
      state.games.forEach((game) => {
        items.push({
          name: `${game.myTeam.name} vs ${game.opponentTeam.name}`,
          date: game.date,
          sportType: game.sportType,
          location: game.location,         
        });
      });
      return items;
    }
  },
  actions: {
    resetState() {
      this.$state = {
        teams: [],
        stats: [],
        games: [],
        activeGame: null,
      };
    },
    loadTestingData() {

      const managedTeam1: ManagedTeam = {
        name: "RedHawks White Team",
        sportType: SportType.Basketball,
        players: [
            { name: "Steve", jerseyNumber: "2", position: BasketballPositionType.Center },
            { name: "Mike", jerseyNumber: "3", position: BasketballPositionType.PointGuard },
            { name: "Dave", jerseyNumber: "5", position: BasketballPositionType.ShootingGuard },
            { name: "Rick", jerseyNumber: "7", position: BasketballPositionType.SmallForward },
            { name: "John", jerseyNumber: "8", position: BasketballPositionType.PowerForward },
            { name: "Dan", jerseyNumber: "9", position: BasketballPositionType.Center },
            { name: "Rob", jerseyNumber: "11", position: BasketballPositionType.PointGuard },
            { name: "Adam", jerseyNumber: "12", position: BasketballPositionType.ShootingGuard },
            { name: "James", jerseyNumber: "15", position: BasketballPositionType.SmallForward },
          ],
      };

      const managedTeam2: ManagedTeam = {
        name: "Saint Mary's",
        sportType: SportType.Basketball,
        players: [
            { jerseyNumber: "2" },
            { jerseyNumber: "3" },
            { jerseyNumber: "5" },
            { jerseyNumber: "7" },
            { jerseyNumber: "8" },
            { jerseyNumber: "9" },
            { jerseyNumber: "11" },
            { jerseyNumber: "12" },
            { jerseyNumber: "14" },
          ],
      };

      const statBundleBasketball: StatBundle = {
        name: "Basketball Default",
        sportType: SportType.Basketball,
        stats: [
          { name: 'FieldGoals', value: 0, incrementBy: 1, incrementTotalScoreBy: 2 },
          { name: 'FreeThrows', value: 0, incrementBy: 1 , incrementTotalScoreBy: 1},
          { name: 'ThreePointers', value: 0, incrementBy: 1, incrementTotalScoreBy: 3 },
          { name: 'Assists', value: 0, incrementBy: 1 },
          { name: 'Rebounds', value: 0, incrementBy: 1 },
          { name: 'Steals', value: 0, incrementBy: 1 },
          { name: 'Blocks', value: 0, incrementBy: 1 },
          { name: 'Turnovers', value: 0, incrementBy: 1 },
          { name: 'Fouls', value: 0, incrementBy: 1 },
        ],
      };

      const statBundleBaseball: StatBundle = {
        name: "Baseball Default",
        sportType: SportType.Baseball,
        stats: [
          { name: 'AtBats', value: 0, incrementBy: 1 },
          { name: 'Hits', value: 0, incrementBy: 1 },
          { name: 'Singles', value: 0, incrementBy: 1 },
          { name: 'Doubles', value: 0, incrementBy: 1 },
          { name: 'Triples', value: 0, incrementBy: 1 },
          { name: 'HomeRuns', value: 0, incrementBy: 1, incrementTotalScoreBy: 1 },
          { name: 'RunsBattedIn', value: 0, incrementBy: 1 },
          { name: 'StolenBases', value: 0, incrementBy: 1 },
          { name: 'CaughtStealing', value: 0, incrementBy: 1 },
        ],
      };

      this.teams = [
        managedTeam1,
        managedTeam2,
      ];
      this.stats = [
        statBundleBasketball,
        statBundleBaseball,
      ];
      this.games = [
        {
          date : new Date().toISOString(),
          id:"1234-2456-45678-1234-23456",
          location:"Evanston, IL",
          sportType: SportType.Basketball,
          myTeam: { ...managedTeam1 },
          opponentTeam: { ...managedTeam2 },
          statBundleName: statBundleBasketball.name,
        },
        {
          date : new Date().toISOString(),
          id:"1234-2456-45678-1234-23457",
          location:"Glenview, IL",
          sportType: SportType.Baseball,
          myTeam: { ...managedTeam1 },
          opponentTeam: { ...managedTeam2 },
          statBundleName: statBundleBaseball.name,
        }
      ]
    }
  },
});