import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import playersJSON from "@/json/players.json";

export interface PlayerState {
  display_name: string;
  full_name?: string;
  id: number;
  color: string;
}

interface PlayerListState {
  allPlayersList: PlayerState[];
  playerList: PlayerState[];
  isCleared: boolean;
}

interface PlayerListActions {
  addPlayer: (newPlayer: PlayerState) => void;
  clear: () => void;
  setClear: (clear: boolean) => void;
  removePlayer: (id: number) => void;
}

const usePlayerStore = create<PlayerListState & PlayerListActions>()(
  devtools(
    persist(
      (set, get) => ({
        allPlayersList: playersJSON,
        playerList: [],
        isCleared: false,
        setClear: (clear) => {
          set({ isCleared: clear });
        },
        addPlayer: (newPlayer) => {
          set({
            playerList: [...get().playerList, newPlayer],
          });
        },
        clear: () => set({ playerList: [], isCleared: true }),
        removePlayer: (playerID) =>
          set({
            playerList: get().playerList.filter(
              (player) => player.id !== playerID
            ),
          }),
      }),
      { name: "players" }
    )
  )
);

export default usePlayerStore;
