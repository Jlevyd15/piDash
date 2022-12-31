import { fixInvalidUtf8 } from "../utils/helpers";
import mockTimesData from "../test_data/times.json";
import MockDataFromSource from "../test_data/511_stoptimetable_WC_SF_BART.json";

const NUMBER_OF_STOP_TIMES = 4;
const OPERATOR_ID = "BA";

const getTransitTimetableAPI = (stopId, lineId) =>
  `https://api.511.org/transit/stoptimetable?api_key=${process.env.TRANSIT_API_KEY}&operatorref=${OPERATOR_ID}&monitoringref=${stopId}&format=json&lineref=${lineId}`;

const getFormattedTimetableData = (data) => {
  try {
    const results = [];
    let lineId = "";

    let dataToJson;
    if (process.env.NODE_ENV !== "production") {
      dataToJson = data;
    } else {
      const cleaned = fixInvalidUtf8(data);
      dataToJson = JSON.parse(cleaned);
    }
    // console.log(cleaned);
    const stopsTimeData =
      dataToJson?.["Siri"]["ServiceDelivery"]["StopTimetableDelivery"][
        "TimetabledStopVisit"
      ];
    // Grab the first two timetable entries only
    for (let i = 0; i < NUMBER_OF_STOP_TIMES; i++) {
      const arrivalTime =
        stopsTimeData[i]?.["TargetedVehicleJourney"]?.["TargetedCall"]
          ?.AimedArrivalTime;
      const arrivalTimeInTwelveHourFormat = new Date(
        arrivalTime
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles",
      });
      const timeNow = Date.now();
      console.log("arrivalTime ", arrivalTime);
      console.log("timeNow ");

      // TODO(@jlevyd15) guard against 0 min from now
      const minutesFromNow = (new Date(arrivalTime) - timeNow) / 60000;
      const formattedMinFromNow =
        minutesFromNow < 1
          ? Math.round(minutesFromNow)
          : Math.round(minutesFromNow) + " min";
      lineId = stopsTimeData[i]?.["TargetedVehicleJourney"]?.["LineRef"];
      results.push({
        arrivalTime: arrivalTimeInTwelveHourFormat,
        etaFromNow: formattedMinFromNow,
      });
    }

    return {
      lineId,
      times: results,
    };
  } catch (err) {
    console.log("err", err);
    return {};
  }
};

const getTimetableData = async (stopId, lineId) => {
  console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
  let raw;
  try {
    // return mock data when we're in dev mode.
    if (process.env.NODE_ENV !== "production") {
      raw = MockDataFromSource;
    } else {
      const response = await fetch(getTransitTimetableAPI(stopId, lineId));
      //TODO - why is this not json() here?
      raw = await response.text();
    }
    return getFormattedTimetableData(raw);
  } catch (err) {
    return {
      error: err,
      message: "Error fetching transit timetable data, please try again.",
    };
  }
};

export default async function times(req, res) {
  const { stopId, lineId } = req.query;

  let data;
  try {
    data = mockTimesData;
    data = await getTimetableData(stopId, lineId);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Error fetching transit data, please try again.",
    });
  }
}
