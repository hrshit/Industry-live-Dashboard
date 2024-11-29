import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ItemList = () => {
  const [data, setData] = useState([]);
  
  console.log("Starting of the ItemList");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/latest-data");

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log("Received data:", receivedData);
      setData(receivedData); 
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []); 

  return (
    <div>
      <h1>Real-Time Data</h1>
      <div >{data.length === 0 ? "Waiting for data..." : ""}</div>

      <ul >
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <Link to={`/${item.Id}`}>
                Name: {item.Name}, Value: {item.Value}
              </Link>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
