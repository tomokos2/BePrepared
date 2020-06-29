const API_URL =
  'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=e29c191314bd71dd940ebc204eedfb1b';

export default async function GetWeather() {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
}
