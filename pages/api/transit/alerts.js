import { fixInvalidUtf8 } from "../utils/helpers";
import mockTimesData from "../test_data/alerts.json";

const OPERATOR_ID = "BA";

const getAlertsAPI = () =>
  `https://api.511.org/transit/servicealerts?api_key=${process.env.TRANSIT_API_KEY}&agency=${OPERATOR_ID}&format=json`;

const getFormattedAlertData = (raw) => {
  const cleaned = fixInvalidUtf8(raw);
  const dataToJson = JSON.parse(cleaned);

  const resultAlerts = dataToJson["Entities"].map((entity) => {
    return entity["Alert"];
  });

  return resultAlerts;
};

const getAlertsData = async () => {
  try {
    const response = await fetch(getAlertsAPI());
    const raw = await response.text();
    return getFormattedAlertData(raw);
  } catch (err) {
    console.log("in the fetch call", err);
    return {
      error: err,
      message: "Error fetching alert data, please try again.",
    };
  }
};

export default async function alerts(req, res) {
  // if (!Array.isArray(jsonLineIds) || jsonLineIds.length < 1) {
  //   return res
  //     .status(401)
  //     .json({ error: "", message: "lineIds must be an Array of lineIds" });
  // }

  try {
    let data;
    if (process.env.NODE_ENV !== "production") {
      data = mockTimesData;
      console.log("Running in dev. mode, returning mock data", data);
    } else {
      data = await getAlertsData();
    }

    res.status(200).json(data);
  } catch (err) {
    console.log("in the get call", err);
    return res.status(500).json({
      error: err,
      message: "Error fetching alert data, please try again.",
    });
  }
}
