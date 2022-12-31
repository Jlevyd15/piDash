import { useState, useEffect } from "react";
import {getTransitTimes} from './api';


export const TransitTimes = ({times}) => {
  const [upcomingTimes, setUpcomingTimes] = useState(times);

  useEffect(async () => {
    const data = await getTransitTimes();
    console.log("data on client is", data);
    setUpcomingTimes(data);
  }, []);

  // If the data changes coming in from props update the state
  useEffect(() => {
    setUpcomingTimes(times);
  }, [times]);

  return (
    <>
      <style jsx global>
        {`
          .times {
            margin-right: 10px;
            font-family: Alien World;
            font-size: 36px;
            font-weight: 900;
            color: yellow;
            text-shadow: 2px 2px 3px #29134d;
          }

          .dash {
            color: turquoise;
          }

          .arrivalTime {
            vertical-align: super;
            font-size: 18px;
            padding-left: 10px;
          }
        `}
      </style>
      <p>
        {upcomingTimes?.times?.map((time, i, arr) => {
          return (
            <span key={i} className="times">
              {i === arr.length - 1 ? (
                <span>
                  <span>{time.etaFromNow}</span>
                  <span className="arrivalTime">{time.arrivalTime}</span>
                </span>
              ) : (
                <>
                  <span>{time.etaFromNow}</span>
                  <span className="arrivalTime">{time.arrivalTime}</span>
                  <span className="dash">{" - "}</span>
                </>
              )}
            </span>
          );
        })}
      </p>
    </>
  );
};
