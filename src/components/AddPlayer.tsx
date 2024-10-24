import React, { useEffect } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import usePlayerStore from "./hooks/usePlayerStore";
import { PlayerState as PlayerType } from "./hooks/usePlayerStore";

export default function AddPlayer() {
  const allPlayersList = usePlayerStore((state) => state.allPlayersList);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [updatePlayerList, setUpdatePlayerList] =
    React.useState(allPlayersList);
  const activePlayerListStore = usePlayerStore((state) => state.playerList);
  const addPlayerAction = usePlayerStore((state) => state.addPlayer);
  const isClearedAction = usePlayerStore((state) => state.isCleared);
  const setClearStore = usePlayerStore((state) => state.setClear);

  useEffect(() => {
    if (isClearedAction) {
      setUpdatePlayerList(allPlayersList);
      setClearStore(false);
    }
  }, [isClearedAction]);

  const handleAddBtn = (e: any) => {
    e.preventDefault();

    const newPlayer: PlayerType = {
      display_name: value,
      id:
        allPlayersList.find((player: any) => player.display_name === value)
          ?.id || -1,
      color:
        allPlayersList.find((player: any) => player.display_name === value)
          ?.color || "",
    };

    // Remove selected players from list
    setUpdatePlayerList(
      updatePlayerList.filter((player: any) => player.display_name !== value)
    );

    addPlayerAction(newPlayer);
    setValue("");
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={activePlayerListStore.length === 4}
          >
            {value
              ? updatePlayerList.find(
                  (player: any) => player.display_name === value
                )?.display_name
              : "Search player.."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search Player..." />
            <CommandList>
              <CommandEmpty>No player found..</CommandEmpty>
              <CommandGroup>
                {updatePlayerList.map((player: any) => (
                  <CommandItem
                    key={player.id}
                    value={player.display_name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === player.display_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {player.display_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="text-white w-full md:w-auto"
        onClick={handleAddBtn}
        disabled={activePlayerListStore.length === 4 || !value}
      >
        Add Player
      </Button>
    </div>
  );
}
