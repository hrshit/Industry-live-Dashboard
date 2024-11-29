"use client"
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { useEffect , useState } from "react";
import { generateTimeValueArray } from '../utils/generateArray';

const LinearChart = () => {
  const { id } = useParams();
    

  const [data, setData] = useState([]);


  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:8000/ws/historical-data/"+id);

  //   socket.onmessage = (event) => {
  //     const receivedData = JSON.parse(event.data);
  //     console.log("LineChartData", receivedData);
  //     setData((prevMessages) =>
  //               [...prevMessages, receivedData]); 
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []); 

  useEffect(() => {
    const array = generateTimeValueArray('03:00:00', '05:00:00'); // Generate data between 03:00:00 and 05:00:00
    setData(array);
  }, []);


  console.log("------ Starting Point --------");
  console.log("data Array", data);  

  const temrature = [
    // { time: 1, value: 450 },
    // { time: 2, value: 290 },
    // { time: 3, value: 150 },
    // { time: 4, value: 415 },
    // { time: 5, value: 90 },
    // { time: 6, value: 145 },
    // { time: 7.2, value: 165 },
    // { time: 8, value: 175 },
    { time: "05:39:11", value: 215 }, // Example time in HH:MM:SS format
    { time: "05:39:12", value: 225 }, // Example time in HH:MM:SS format
    { time: "05:39:13", value: 435 }, // Example time in HH:MM:SS format
    { time: "05:59:14", value: 410 }, // Example time in HH:MM:SS format
    { time: "06:39:55", value: 255 }, // Example time in HH:MM:SS format
    { time: "07:39:32", value: 265 }, // Example time in HH:MM:SS format
    { time: "08:30:33", value: 275 }, // Example time in HH:MM:SS format
    { time: "09:39:34", value: 285 }, // Example time in HH:MM:SS format
    { time: "10:39:35", value: 295 }, // Example time in HH:MM:SS format
    { time: "10:39:36", value: 315 }, // Example time in HH:MM:SS format
    { time: "10:39:37", value: 265 }, // Example time in HH:MM:SS format
    { time: "10:39:38", value: 265 }, // Example time in HH:MM:SS format
    { time: "10:39:39", value: 265 }, // Example time in HH:MM:SS format
    { time: "10:39:40", value: 265 }, // Example time in HH:MM:SS format
  ];

  // console.log("Data array", data)
  console.log("Data value", data[3303])
  
   if(data.length > 0){
    data[3303] = 200;
   }
  // Function to convert HH:MM:SS to total minutes

  function convertTimeToMinutes(time) {
    if (typeof time === "string") {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 60 * 60 + minutes * 60 + seconds ;
    } else {
      return time * 60 * 60; // If time is in hours (numeric), convert to minutes
    }
  }

  function CustomTooltip({ payload, label, active }) {
    // Convert label (in seconds) to HH:MM:SS format
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Get total hours
        const minutes = Math.floor((seconds % 3600) / 60); // Get minutes after extracting hours
        const secs = seconds % 60; // Get remaining seconds
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    if (active && payload && payload.length) {
        const labelFormatted = formatTime(label); // Format label as HH:MM:SS
        return (
            <div style={{ backgroundColor: "red", padding: "4px", border: "2px solid red" }}>
                <p className="desc">Attribute Value: {payload[0].value} </p>
                <p className="label">{`Date/time: ${labelFormatted}`}</p>
                <p className="label">{`Value: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null; // Return null if not active or no payload
}


  // for the dummy data   

  // const formattedData = temrature.map(entry => ({
  //   time: convertTimeToMinutes(entry.time), // Convert time to seconds
  //   value: entry.value,
  // }));

  // for the live data 
  const formattedData = data.map(entry => ({
    time: convertTimeToMinutes(entry.time), // Convert time to seconds
    value: entry.value,
  }));

  return (
    <>
      <LineChart width={1000} height={700} data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, 24 * 60 * 60]} // 
          ticks={[...Array(25).keys()].map(i => i * 60 * 60 )} 
          tickFormatter={(time) => `${Math.floor(time / (60 * 60))}`} 
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={400} stroke="Red" strokeDasharray="4 4" />
        <ReferenceLine y={250} stroke="Red" strokeDasharray="4 4" />
        <Line type="linear" dataKey="value" dot={false} activeDot={false}/>
      </LineChart>
    </>
  );
}

export default LinearChart;