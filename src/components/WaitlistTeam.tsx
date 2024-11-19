import { cn } from "@/lib/utils";
import usePlayerStore from "../hooks/usePlayerStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { PlayerState as PlayerType } from "../hooks/usePlayerStore";
import { colorVariantsTag } from "@/lib/utils";

export default function WaitListTeam() {
  const { toast } = useToast();
  const { activePlayerList } = usePlayerStore();
  const { removePlayer } = usePlayerStore((state) => state);
  const { setWaitListHistory, clearHistory } = usePlayerStore((state) => state);

  const handleRemoveBtn = (player: PlayerType) => {
    removePlayer(player.id);
  };

  const onClickHandle = () => {
    setWaitListHistory({
      players: activePlayerList,
      timeStamp: new Date(),
    });
    clearHistory();
    toast({
      title: "Added to waitlist",
      duration: 4000,
    });
  };

  return (
    <>
      <h3 className="font-semibold tracking-tight text-xl text-secondary">
        Waitlist Team
      </h3>
      <p className="text-sm text-muted-foreground mb-5 ">
        Confirm your teammates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activePlayerList &&
          activePlayerList.map((player) => (
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
        {[...Array(4 - activePlayerList.length)].map((i) => (
          <div
            key={i}
            className={cn(
              "w-full h-20 flex justify-center text-center items-center text-2xl text-black/20 font-bold rounded-xl relative border-dashed border-4"
            )}
          >
            <div className="tracking-wide">PLAYER</div>
          </div>
        ))}
      </div>
      <br />
      <Button disabled={activePlayerList?.length !== 4} onClick={onClickHandle}>
        Confirm Team
      </Button>
    </>
  );
}
