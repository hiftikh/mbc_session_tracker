import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import usePlayerStore from "@/hooks/usePlayerStore";
import { useToast } from "@/hooks/use-toast";
import { colorVariantsTag } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Alert from "./Alert";

export default function WaitlistHistory() {
  const { waitList, deleteFromWaitListHistory } = usePlayerStore(
    (state) => state
  );
  const { toast } = useToast();

  const handleDownloadAsCVSBtn = () => {
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

  const handleDeleteWaitlist = (timeStamp: Date) => {
    deleteFromWaitListHistory(timeStamp);
    toast({
      description: "Waitlist has been deleted.",
      duration: 4000,
    });
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
        <TableHead className="w-[120px] text-center">{formatedTime}</TableHead>
        <TableHead>
          {list.players &&
            list.players.map((player) => {
              return (
                <Badge
                  key={player.id}
                  variant="outline"
                  className={cn(
                    "mr-2 my-1 text-white text-base px-5",
                    `${colorVariantsTag[player.color]}`
                  )}
                >
                  {player.display_name}
                </Badge>
              );
            })}
        </TableHead>
        <TableHead className="w-[120px] text-center flex mx-auto">
          <Button variant="ghost" disabled>
            <Pencil />
          </Button>
          <Alert
            trigger={
              <Button variant="ghost">
                <Trash2 />
              </Button>
            }
            title="Are you absolutely sure?"
            description="This action cannot be undone."
            action={() => handleDeleteWaitlist(list.timeStamp as Date)}
            actionLabel="Delete"
          />
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
              <TableHead className="text-center">Game#</TableHead>
              <TableHead className="text-center">Start Time</TableHead>
              <TableHead>Players</TableHead>
              <TableHead className="text-center">Actions</TableHead>
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
          onClick={handleDownloadAsCVSBtn}
        >
          Save History as CSV
        </Button>
      )}
    </>
  );
}
