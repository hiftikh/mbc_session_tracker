import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import playersJSON from "@/json/players.json";

export interface PlayerState {
  id: number;
  display_name: string;
  full_name?: string;
  color: string;
}

export interface WaitListHistoryState {
  players?: PlayerState[];
  timeStamp?: Date;
}

export interface PlayerListState {
  allPlayersList: PlayerState[];
  activePlayerList: PlayerState[];
  inActivePlayersList: PlayerState[];
  waitList: WaitListHistoryState[];
}

interface PlayerActions {
  addPlayer: (newPlayer: PlayerState) => void;
  removePlayer: (id: number) => void;
  setInActivePlayersList: (list: PlayerState[]) => void;
  setWaitListHistory: (list: WaitListHistoryState) => void;
  clearHistory: () => void;
}

const usePlayerStore = create<
  PlayerListState & WaitListHistoryState & PlayerActions
>()(
  devtools(
    persist(
      (set, get) => ({
        allPlayersList: playersJSON,
        activePlayerList: [],
        inActivePlayersList: playersJSON,
        waitList: [],
        addPlayer: (newPlayer) => {
          set({
            activePlayerList: [...get().activePlayerList, newPlayer],
          });
        },
        removePlayer: (playerID) => {
          const filterActivePlayer = get().activePlayerList.filter(
            (player) => player.id !== playerID
          );
          set({
            inActivePlayersList: [
              ...get().inActivePlayersList,
              filterActivePlayer[0],
            ].sort((a, b) => a.display_name.localeCompare(b.display_name)),
            activePlayerList: filterActivePlayer,
          });
        },
        setInActivePlayersList: (list) => {
          set({ inActivePlayersList: list });
        },
        clearHistory: () => {
          set({
            activePlayerList: [],
            inActivePlayersList: playersJSON,
            // waitList: [],
          });
        },
        setWaitListHistory: (list) => {
          set({
            waitList: [...get().waitList, list],
          });
        },
      }),
      { name: "players" }
    )
  )
);

export default usePlayerStore;
