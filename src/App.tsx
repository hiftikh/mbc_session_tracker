import { Separator } from "@/components/ui/separator";

import PlayerSelection from "@/components/PlayerSelection";
import WaitListTeam from "@/components/WaitlistTeam";
import WaitlistHistory from "@/components/WaitlistHistory";
import ResetButton from "./components/ResetButton";

function App() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-8/12 ">
          <h1 className="text-center text-3xl font-bold text-white mb-3">
            MBC Session Tracker
          </h1>
          <div className="rounded-lg border bg-card shadow-lg">
            <div className="p-7">
              <PlayerSelection />
              <Separator className="my-8" />
              <WaitListTeam />
              <Separator className="my-8" />
              <WaitlistHistory />
              <Separator className="my-8" />
              <ResetButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
