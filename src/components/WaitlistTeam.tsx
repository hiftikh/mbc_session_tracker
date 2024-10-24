import { cn } from "@/lib/utils";
import usePlayerStore from "./hooks/usePlayerStore";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function WaitListTeam() {
  const { playerList } = usePlayerStore();
  const removePlayerAction = usePlayerStore((state) => state.removePlayer);

  const colorVariants: any = {
    blue: "bg-blue-700",
    red: "bg-red-700",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
  };
  return (
    <>
      <h3 className="font-semibold tracking-tight text-xl text-secondary">
        Waitlist Team
      </h3>
      <p className="text-sm text-muted-foreground mb-5 ">
        Confirm your teammates.
      </p>
      <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 gap-5">
        {playerList &&
          playerList.map((player: any) => (
            <div
              key={player.id}
              className={cn(
                "w-full h-20 flex justify-center text-center items-center text-2xl text-white font-bold rounded-xl relative",
                `${colorVariants[player.color]}`
              )}
            >
              <div>
                <div className="tracking-wide">
                  {player.display_name.toUpperCase()}
                </div>
                <Button
                  onClick={() => removePlayerAction(player.id)}
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
