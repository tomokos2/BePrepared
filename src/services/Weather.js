let latitude = '41.8781';
let longitude = '-87.6298';

const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&units=imperial&exclude=minutely&appid=e29c191314bd71dd940ebc204eedfb1b`;

export default async function GetWeather(lat, long) {
  if (lat && long) {
    latitude = lat;
    longitude = long;
  }
  console.log(API_URL);
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
