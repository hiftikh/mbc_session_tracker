import React from "react";

import { Check, ChevronsUpDown, Circle } from "lucide-react";
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
import { colorVariantsIcon } from "@/lib/utils";

import usePlayerStore from "./hooks/usePlayerStore";
import { PlayerState as PlayerType } from "./hooks/usePlayerStore";

export default function AddPlayer() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const allPlayersList = usePlayerStore((state) => state.allPlayersList);
  const activePlayerList = usePlayerStore((state) => state.activePlayerList);

  const { inActivePlayersList, setInActivePlayersList } = usePlayerStore(
    (state) => state
  );
  const addPlayerAction = usePlayerStore((state) => state.addPlayer);

  const handleAddBtn = (e: any) => {
    e.preventDefault();

    const newPlayer: PlayerType = {
      color:
        allPlayersList.find((player: any) => player.display_name === value)
          ?.color || "",
      full_name:
        allPlayersList.find((player: any) => player.display_name === value)
          ?.full_name || "",
      display_name: value,
      id:
        allPlayersList.find((player: any) => player.display_name === value)
          ?.id || -1,
    };

    setInActivePlayersList(
      inActivePlayersList.filter((player: any) => player.display_name !== value)
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
            disabled={activePlayerList.length === 4}
          >
            {value
              ? inActivePlayersList.find(
                  (player: any) => player.display_name === value
                )?.full_name
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
                {inActivePlayersList.map((player: any) => (
                  <CommandItem
                    key={player.id}
                    value={player.display_name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Circle
                      fill={`${colorVariantsIcon[player.color]}`}
                      strokeWidth={0}
                      className="mr-2"
                    />

                    {player.display_name}
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        value === player.display_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
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
        disabled={activePlayerList.length === 4 || !value}
      >
        Add Player
      </Button>
    </div>
  );
}
