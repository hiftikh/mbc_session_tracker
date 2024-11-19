import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import usePlayerStore from "@/hooks/usePlayerStore";
import { colorVariantsTag } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function WaitlistHistory() {
  const { waitList } = usePlayerStore((state) => state);

  const onClickBtnHandle = () => {
    const waitListData = waitList
      .map((entry) => {
        let playersList;
        const formatTime = new Date(entry.timeStamp?.toString() as string);
        const formatedTime = `${formatTime.toLocaleTimeString()}`;
        const formatedDate = `${formatTime.toLocaleDateString()}`;
        playersList = entry.players
          ?.map((player) => player.display_name)
          .join(", ");
        return `${formatedDate},${formatedTime},${playersList}`;
      })
      .join("\n");

    const csvContent =
      "data:text/csv;charset=utf-8,Date,Start Time,Player1,Player2,Player3,Player4\n" +
      waitListData;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "waitlist_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const waitlistData = waitList.map((list, index) => {
    const formatTime = new Date(list.timeStamp?.toString() as string);
    const formatedTime = `${formatTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;

    return (
      <TableRow key={index}>
        <TableHead className="w-[50px] text-center">{index + 1}</TableHead>
        <TableHead className="w-[150px]">{formatedTime}</TableHead>
        <TableHead>
          {list.players &&
            list.players.map((player) => {
              return (
                <Badge
                  key={player.id}
                  variant="outline"
                  className={cn(
                    "mr-1 text-white",
                    `${colorVariantsTag[player.color]}`
                  )}
                >
                  {player.display_name}
                </Badge>
              );
            })}
        </TableHead>
      </TableRow>
    );
  });

  return (
    <>
      <h3 className="font-semibold tracking-tight text-xl text-secondary">
        Waitlist History
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Detail containing waitlist history
      </p>
      {waitList.length === 0 && <p>No waitlist history.</p>}
      {waitList.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game#</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Players</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{waitlistData}</TableBody>
        </Table>
      )}
      <br />
      {waitList.length !== 0 && (
        <Button
          disabled={!waitList}
          className="mx-auto text-center"
          onClick={onClickBtnHandle}
        >
          Save History as CSV
        </Button>
      )}
    </>
  );
}
