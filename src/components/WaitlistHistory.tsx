import React from "react";
import usePlayerStore from "@/hooks/usePlayerStore";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WaitlistHistory() {
  const { waitList } = usePlayerStore((state) => state);

  const waitlistData = waitList.map((list, index) => {
    const formatTime = new Date(list.timeStamp?.toString() as string);
    const formatedTime = `${formatTime.toLocaleTimeString()}`;
    console.log(formatTime);
    return (
      <TableRow key={index}>
        <TableHead>{index + 1}</TableHead>
        <TableHead>{formatedTime}</TableHead>
        <TableHead>
          {list.players &&
            list.players.map((player) => {
              return (
                <React.Fragment key={player.id}>
                  {player.display_name}{" "}
                </React.Fragment>
              );
            })}
        </TableHead>
      </TableRow>
    );
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game #</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{waitlistData}</TableBody>
      </Table>
    </>
  );
}
