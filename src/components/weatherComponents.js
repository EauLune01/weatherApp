//현재 날씨 api를 호출해서 결과를 보여주는 요소를 리턴하는 함수
import axios from "axios";
export function createWeatherComponent(API_KEY){
    const weatherContainer=document.createElement('div');

    //현재 위치 받아오기
    const locationElement=document.createElement('p');
    locationElement.id='location';
    weatherContainer.appendChild(locationElement);
    //온도
    const temperatureElement=document.createElement('p');
    temperatureElement.id='temperature';
    weatherContainer.appendChild(temperatureElement);
    //설명
    const descriptionElement=document.createElement('p');
    descriptionElement.id='description';
    weatherContainer.appendChild(descriptionElement);

    //TODO: 날씨정보 가져오기
    function fetchWeather(lat,lon){ //위도, 경도
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ko`;

        axios.get(url).then(response=>{
            const data=response.data;
            locationElement.textContent=`위치: ${data.name}`;
            temperatureElement.textContent = `온도: ${data.main.temp}℃`;
            descriptionElement.textContent=`날씨: ${data.weather[0].description}`;
        }).catch(error=>{
            locationElement.textContent='날씨 정보를 가져오는데 실패했습니다.';
            console.error('Error fetching weather data: ',error);
        })
    }
    //위도, 경도 정보
    if(navigator.geolocation){ //navigator 안에 있으면
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude}=position.coords;
            fetchWeather(latitude,longitude);
        },(error)=>{
            locationElement.textContent='위치 정보를 가져오는데 실패했습니다.';
            console.error('Error getting geolocation:',error);
        })
    } else {
        locationElement.textContent='Geolocation을 지원하지 않는 브라우저입니다.';
    }
    //TODO: API 호출하기
    return weatherContainer;
}