import "./App.css";

import PlayerSelection from "./components/PlayerSelection";
import usePlayerStore from "./components/hooks/usePlayerStore";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import WaitListTeam from "./components/WaitlistTeam";

function App() {
  const clearBtnAction = usePlayerStore((state) => state.clear);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
              <Button onClick={clearBtnAction}>Refresh History</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
