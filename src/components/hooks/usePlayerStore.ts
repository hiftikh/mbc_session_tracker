import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import playersJSON from "@/json/players.json";
import { orderByAlphabetically } from "@/lib/utils";

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
  // waitlistHistory: [];
}

interface PlayerListActions {
  addPlayer: (newPlayer: PlayerState) => void;
  clearHistory: () => void;
  removePlayer: (id: number) => void;
  setInActivePlayersList: (list: PlayerState[]) => void;
}

const usePlayerStore = create<PlayerListState & PlayerListActions>()(
  devtools(
    persist(
      (set, get) => ({
        allPlayersList: playersJSON,
        inActivePlayersList: playersJSON,
        activePlayerList: [],
        isCleared: false,

        setInActivePlayersList: (list) => {
          set({ inActivePlayersList: list });
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
