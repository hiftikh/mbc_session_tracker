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
      {playerList &&
        playerList.map((player: any) => (
          <div
            key={player.id}
            className={cn(
              "w-full h-20 mb-5 flex justify-center text-center items-center text-2xl text-white font-bold rounded-xl relative",
              `${colorVariants[player.color]}`
            )}
          >
            <div>{player.display_name}</div>
            <Button
              onClick={() => removePlayerAction(player.id)}
              className="absolute -top-3 -left-3 rounded-full text-black  hover:bg-slate-200 px-3"
              variant="outline"
            >
              <X />
            </Button>
          </div>
        ))}
    </>
  );
}
