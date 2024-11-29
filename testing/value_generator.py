# value_generator.py
import time
import random

# Function to format the current time as HH:MM:SS
def get_current_time():
    now = time.localtime()  
    return time.strftime("%H:%M:%S", now) 

# Function to generate a random value between 150 and 400
def get_random_value():
    return random.randint(150, 153)

# Function to generate and return the value with time when called
def generate_value():
    time_str = get_current_time() 
    value = get_random_value()  
    return {"time": time_str, "Value": value} 
