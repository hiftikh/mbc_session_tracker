import AddPlayer from "./AddPlayer";

export default function PlayerSelection() {
  return (
    <>
      <h3 className="font-semibold tracking-tight text-xl text-secondary">
        Player Selection
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Type or select a player to add them to the waitlist.
      </p>
      <AddPlayer />
    </>
  );
}
