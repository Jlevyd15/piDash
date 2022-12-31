export const getTransitTimes = async () => {
  const response = await fetch(
    "/api/transit/times?stopId=PHIL&lineId=Yellow-S",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getAlerts = async () => {
  const response = await fetch("/api/transit/alerts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const jsonData = await response.json();
  return jsonData;
};