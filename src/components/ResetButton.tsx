import usePlayerStore from "@/hooks/usePlayerStore";
import { useToast } from "@/hooks/use-toast";

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
import { Button } from "@/components/ui/button";
import React from "react";

export default function ResetButton() {
  const { resetAll } = usePlayerStore((state) => state);
  const { toast } = useToast();

  const onClickHandle = () => {
    resetAll();
    toast({
      description: "Waitlist Team and History have been reset.",
      duration: 4000,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Reset All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Waitlist Team and History sections.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClickHandle}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
