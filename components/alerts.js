import { useState, useEffect } from "react";
import { getAlerts } from './api';


export const Alerts = ({alerts}) => {
  const [alertsState, setAlerts] = useState();

  useEffect(async () => {
    const data = await getAlerts();
    console.log("Alerts data on client is", data);
    setAlerts(data);
  }, []);


  // If the data changes coming in from props update the state
  useEffect(() => {
    setAlerts(alerts);
  }, [alerts]);

  return (
    <>
      <style jsx global>
        {`
          .alerts-container {
            position: fixed;
            bottom: 10px;
          }
          .alert {
            margin: 0px 10px 20px;
            font-family: Alien World;
            font-size: 16px;
            font-weight: 900;
            color: yellow;
            text-shadow: 2px 2px 3px #29134d;
          }

          .dash {
            color: turquoise;
          }
        `}
      </style>
      <div className="alerts-container">
        {alertsState?.data?.map((alert, i) => {
          console.log(alert.DescriptionText.Translations[0].Text);
          return (
            <div key={i} className="alert">
              {alert.DescriptionText.Translations[0].Text}
            </div>
          );
        })}
      </div>
    </>
  );
};
