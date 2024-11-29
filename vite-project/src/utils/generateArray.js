
export function generateTimeValueArray(startTime, endTime) {
    const array = [];
    const min = 347
    const max = 351
  
    // Convert start and end times to Date objects for easy manipulation
    const startDate = new Date(`1970-01-01T${startTime}Z`);
    const endDate = new Date(`1970-01-01T${endTime}Z`);
  
    let currentDate = startDate;
  
    while (currentDate <= endDate) {
      const hours = String(currentDate.getUTCHours()).padStart(2, '0');
      const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
  
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
  
      array.push({ time, value });
  
      currentDate = new Date(currentDate.getTime() + 1000); // 1000ms = 1 second
    }
  
    return array;
  }
  