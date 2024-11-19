import usePlayerStore from "@/hooks/usePlayerStore";
import { useToast } from "@/hooks/use-toast";
import Alert from "./Alert";
import { Button } from "./ui/button";

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
    <Alert
      trigger={<Button>Reset All</Button>}
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your
            Waitlist Team and History sections."
      action={onClickHandle}
      actionLabel="Reset"
    />
  );
}
