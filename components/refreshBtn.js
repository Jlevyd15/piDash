import { getAlerts, getTransitTimes } from './api';

export const RefreshBtn = ({setAlerts, setTimes}) => {

  const handleOnClick = async () => {
    console.log('clicking!');
    // API calls
    const times = await getTransitTimes();
    const alerts = await getAlerts();

    // setState
    setAlerts(alerts)
    setTimes(times)
  }

  return (
    <>
      <style jsx global>
      {`
        .refresh-btn {
          background: transparent;
          border: 1px solid yellow;
          border-radius: 5px;
          width: 50px;
          height: 50px;
          color: yellow;
          position: fixed;
          top: 2px;
          right: 2px;
          font-family: "Alien World";
          font-size: 20px;
        }
        `}
      </style>
      <button onClick={handleOnClick} className="refresh-btn">+</button>
    </>
  )
}