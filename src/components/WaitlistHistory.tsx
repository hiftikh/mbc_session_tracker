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

    return (
      <TableRow key={index}>
        <TableHead>{index + 1}</TableHead>
        <TableHead>{formatedTime}</TableHead>
        <TableHead>
          {list.players &&
            list.players.map((player, index) => {
              return (
                <React.Fragment key={player.id}>
                  {player.display_name}
                  {index !== 3 ? ", " : ""}
                </React.Fragment>
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
              <TableHead>Game #</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Players</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{waitlistData}</TableBody>
        </Table>
      )}
    </>
  );
}
