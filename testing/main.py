import pyodbc
from fastapi import FastAPI, WebSocket
import asyncio
from value_generator import generate_value 

app = FastAPI()

from datetime import datetime

connection_string = "Driver={SQL Server};Server=DESKTOP-C4GD19I\\SQLEXPRESS;Database=History;Trusted_Connection=yes;"
conn = pyodbc.connect(connection_string)

def fetch_latest_data():
    cursor = conn.cursor()
    # Query to get the latest record (adjust table and fields as needed)
    cursor.execute("SELECT * FROM Items") 
    rows = cursor.fetchall()
    print("rows hre", rows)
    rowItems = []
    if rows:
        for row in rows:
            rowItems.append({"Name": row.Name, "Value": row.Value, "Id" : row.ID})
            # print({"Name": row.Name, "Value": row.Value})
        return rowItems
        # return {"Name": row.Name, "Value": row.Value}  # Adjust fields as needed
    return None

def fetch_historical_data(id):
    cursor = conn.cursor()
    cursor.execute("SELECT TOP 1 * FROM HistoricalData WHERE [ID]=?", (id,)) 
    row = cursor.fetchone()
    print(row)
    if row:
        # time = formateTime(row.TimeStamp)
        print("value timeStamp", row.Value, (row.TimeStamp).strftime("%X"))
        return { "Value" : row.Value, "TimeStamp" : (row.TimeStamp).strftime("%X")}
        # return {"Name": row.Name, "Value": row.Value}  # Adjust fields as needed
    return None


@app.websocket("/ws/latest-data")
async def websocket_endpoint(websocket: WebSocket):
    # Accept the WebSocket connection
    await websocket.accept()
    try:
        while True:
            # Fetch the latest data from SQL Server
            data = fetch_latest_data()
            print(f"Data1: {data}")
            if data:
                await websocket.send_json(data)  # Send data as JSON to the client
            await asyncio.sleep(1) # Push updates every second
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await websocket.close()


@app.websocket("/ws/historical-data/{id}")
async def websocket_endpoint(websocket: WebSocket, id : str):
    # Accept the WebSocket connection
    await websocket.accept()
    try:
        while True:
            print(f"our id: {id}")
            data1 = generate_value()
            print(f"Data1: {data1}")
            if data1:
                await websocket.send_json(data1)  # Send data as JSON to the client
            await asyncio.sleep(1)  # Push updates every second
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await websocket.close()





