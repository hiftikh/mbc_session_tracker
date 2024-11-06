import PlayerSelection from "./components/PlayerSelection";
import usePlayerStore from "./hooks/usePlayerStore";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import WaitListTeam from "./components/WaitlistTeam";
// import WaitlistHistory from "./components/WaitlistHistory";

function App() {
  const clearBtnAction = usePlayerStore((state) => state.clearHistory);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h1 className="text-center text-3xl font-bold text-secondary mb-3">
            MBC Session Tracker
          </h1>

          <div className="rounded-lg border bg-card text-card-foreground shadow-lg">
            <div className="p-7">
              <PlayerSelection />
              <Separator className="my-8" />
              <WaitListTeam />
              <Separator className="my-8" />
              {/* <WaitlistHistory /> */}
              {/* <Separator className="my-8" /> */}
              <Button onClick={clearBtnAction}>Refresh History</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
