import { cn } from "@/lib/utils";
import usePlayerStore from "./hooks/usePlayerStore";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { PlayerState as PlayerType } from "./hooks/usePlayerStore";
import { colorVariantsTag } from "@/lib/utils";

export default function WaitListTeam() {
  const { activePlayerList } = usePlayerStore();
  const removePlayerAction = usePlayerStore((state) => state.removePlayer);

  const handleRemoveBtn = (player: PlayerType) => {
    removePlayerAction(player.id);
  };

  return (
    <>
      <h3 className="font-semibold tracking-tight text-xl text-secondary">
        Waitlist Team
      </h3>
      <p className="text-sm text-muted-foreground mb-5 ">
        Confirm your teammates.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {activePlayerList &&
          activePlayerList.map((player: any) => (
            <div
              key={player.id}
              className={cn(
                "w-full h-20 flex justify-center text-center items-center text-2xl text-white font-bold rounded-xl relative",
                `${colorVariantsTag[player.color]}`
              )}
            >
              <div>
                <div className="tracking-wide">
                  {player.display_name.toUpperCase()}
                </div>
                <Button
                  onClick={() => handleRemoveBtn(player)}
                  className="absolute -top-1 -right-2 text-white bg-transparent hover:bg-transparent"
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
