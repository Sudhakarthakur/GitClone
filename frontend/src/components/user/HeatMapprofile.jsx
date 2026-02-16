import React from "react";
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";
import { useEffect } from "react";

const generateActtivityDate = (startDate, endDate) => {
  const data = [];
  const CurrentDate = new Date(startDate);
  const end = new Date(endDate);

  while (CurrentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      Date: CurrentDate.toISOString().split("T")[0],
      count: count,
    });
    CurrentDate.setDate(CurrentDate.getDate() + 1);
  }
  return data;
};

const getPanelColours = (maxCount) => {
  const colour = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenVlue = Math.floor((i / maxCount) * 255);
    colour[i] = `rgb(0,${greenVlue},0)`;
  }
  return colour;
};
const HeatMapProfile = () => {
  const [activityDate, setActivityDate] = useState([]);
  const [panelColours, setPanelColours] = useState({});

  useEffect(() => {
    const featchData = async () => {
      const startDate = "2002-01-12";
      const endDate = "2002-02-12";
      const data = generateActtivityDate(startDate, endDate);
      setActivityDate(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColours(getPanelColours(maxCount));
    };
    featchData();
  }, []);

  return (
    <div>
      <h4>Recent Contribution</h4>
      <HeatMap
        // className="HeapMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityDate}
        weekLabels={["sun", "mon", "tus", "web", "fri", "sat"]}
        startDate={new Date(2002 - 1 - 12)}
        rectSize={15}
        space={3}
        rectProps={{ rx: 2.5 }}
        panelColors={panelColours}
      />
      {/* <HeatMap
        className="HeapMapProfile"
        style={{ macWidth: "700px", height: "200px", colour: "white" }}
        value={activityDate}
        weekLables={["sun", "mon", "tue", "web", "thu", "fri", "sat"]}
        startDate={new Date("12-01-2002")}
        rectSize={15}
        space={3}
        rectpropse={{ rx: 2.5 }}
        panelColours={panelColours}
      /> */}
    </div>
  );
};
export default HeatMapProfile;
