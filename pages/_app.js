import {useState} from 'react';
import "../components/background.css";
import { Background } from "../components/background";
import { Clock } from "../components/clock";
import { TransitTimes } from "../components/transitTimes";
import { Alerts } from "../components/alerts";
import { RefreshBtn } from "../components/refreshBtn";

export const App = () => {
  const [times, setTimes] = useState();
  const [alerts, setAlerts] = useState();
  return (
    <>
      <style jsx global>
        {`
          .soft-background {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}
      </style>
      <Background />
      <div className="soft-background">
        <RefreshBtn setTimes={setTimes} setAlerts={setAlerts} />
        <Clock />
        <TransitTimes times={times} />
        <Alerts alerts={alerts} />
      </div>
    </>
  );
};

export default App;
