import { useState, useEffect } from "react";

Number.prototype.pad = function (n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock(setDateTime) {
  let now = new Date();
  let sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = (now.getHours() + 24) % 12 || 12,
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDateTime = [
    months[mo],
    dy,
    yr,
    hou.pad(2),
    min.pad(2),
    sec.pad(2),
  ];
  // console.log(currentDateTime);
  setDateTime(currentDateTime);
}

export const Clock = () => {
  const [dateTime, setDateTime] = useState([]);

  useEffect(() => {
    setInterval(() => updateClock(setDateTime), 1000);
  }, []);

  return (
    <>
      <style jsx global>
        {`
          .dateTime {
            margin-right: 10px;
            font-family: Alien World;
            font-size: 24px;
            font-weight: 900;
            color: yellow;
            text-shadow: 2px 2px 3px #29134d;
          }

          .flex {
          }
        `}
      </style>
      <p>
        {dateTime.map((el, i) => (
          <span key={i} className="dateTime">
            {el}
          </span>
        ))}
      </p>
    </>
  );
};
