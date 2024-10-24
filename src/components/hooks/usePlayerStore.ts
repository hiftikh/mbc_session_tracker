import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import playersJSON from "@/json/players.json";
import { timeStamp } from "console";

export interface PlayerState {
  display_name: string;
  full_name?: string;
  id: number;
  color: string;
}

interface PlayerListState {
  allPlayersList: PlayerState[];
  activePlayerList: PlayerState[];
  inActivePlayersList: PlayerState[];
}

interface WaitlistState {
  waitlists: PlayerListState[];
  timestamp: number;
}

interface PlayerListActions {
  addPlayer: (newPlayer: PlayerState) => void;
  clearHistory: () => void;
  removePlayer: (id: number) => void;
  setActivePlayerList: (list: PlayerState[]) => void;
  setInActivePlayersList: (list: PlayerState[]) => void;
  setWaitListHistory: (list: WaitlistState[]) => void;
}

const usePlayerStore = create<
  PlayerListState & PlayerListActions & WaitlistState
>()(
  devtools(
    persist(
      (set, get) => ({
        allPlayersList: playersJSON,
        inActivePlayersList: playersJSON,
        activePlayerList: [],
        waitlists: [],
        timestamp: 0,
        isCleared: false,
        setInActivePlayersList: (list) => {
          set({ inActivePlayersList: list });
        },
        setWaitListHistory: (list) => {
          // set({ waitlists: [...get().waitlists, [list, Date.now()]] });
        },
        setActivePlayerList: (list) => {
          set({ activePlayerList: list });
        },
        addPlayer: (newPlayer) => {
          set({
            activePlayerList: [...get().activePlayerList, newPlayer],
          });
        },
        clearHistory: () =>
          set({
            activePlayerList: [],
            inActivePlayersList: playersJSON,
          }),
        removePlayer: (playerID) =>
          set({
            inActivePlayersList: [
              ...get().inActivePlayersList,
              get().activePlayerList.filter(
                (player) => player.id === playerID
              )[0],
            ].sort((a, b) => a.display_name.localeCompare(b.display_name)),
            activePlayerList: get().activePlayerList.filter(
              (player) => player.id !== playerID
            ),
          }),
      }),
      { name: "players" }
    )
  )
);

export default usePlayerStore;
