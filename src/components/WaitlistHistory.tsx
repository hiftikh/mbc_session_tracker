import React from "react";
import usePlayerStore from "@/hooks/usePlayerStore";
import { colorVariantsTag } from "@/lib/utils";

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

import { Badge } from "@/components/ui/badge";

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
