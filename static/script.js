function displayWeatherData(data, location) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = '';

  const locationElement = document.createElement('div');
  locationElement.textContent = `Location: ${location}`;
  locationElement.style.fontWeight = 'bold';
  locationElement.style.marginBottom = '10px'; 
  locationElement.style.textTransform = 'uppercase';
  weatherInfo.appendChild(locationElement);

  const weatherItems = [
    { label: 'Temperature:', value: `${data.main.temp}°C` },
    { label: 'Humidity:', value: `${data.main.humidity}%` },
    { label: 'Wind Speed:', value: `${data.wind.speed} m/s` },
  ];

  if (data.air_quality && data.air_quality.value) {
    weatherItems.push({ label: 'Air Quality:', value: `${data.air_quality.value}` });
  }

  if (data.rain && data.rain['1h']) {
    weatherItems.push({ label: 'Precipitation:', value: `${data.rain['1h']} mm` });
  }

  weatherItems.forEach(item => {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-info-item');

    const label = document.createElement('label');
    label.textContent = item.label;

    const value = document.createElement('span');
    value.textContent = item.value;

    weatherItem.appendChild(label);
    weatherItem.appendChild(value);
    weatherInfo.appendChild(weatherItem);
  });

  const weatherCondition = data.weather[0].main;
  const weatherConditionElement = document.createElement('div');
  weatherConditionElement.textContent = `Weather Condition: ${weatherCondition}`;
  weatherConditionElement.style.fontWeight = 'bold';
  weatherInfo.appendChild(weatherConditionElement);

  const weatherConditionLower = weatherCondition.toLowerCase();
  updateBackgroundVideo(weatherConditionLower);

  // Apply slower gradual opening effect
  weatherInfo.style.opacity = 0;
  weatherInfo.style.transition = 'opacity 2s';
  setTimeout(() => {
    weatherInfo.style.opacity = 1;
  }, 500);
}

function updateBackgroundVideo(weatherCondition) {
  const videoElement = document.getElementById('background-video');
  const sourceElement = document.getElementById('video-source');

  // Pause the video initially
  videoElement.pause();

  // Define the mapping of weather conditions to video file names
  const weatherVideos = {
    sunny: 'videos/sunny.mp4',
    rain: 'videos/rainy.mp4',
    shower: 'videos/rainy.mp4',
    drizzle: 'videos/rainy.mp4',
    cloud: 'videos/cloudy.mp4',
    overcast: 'videos/cloudy.mp4',
    wind: 'videos/windy.mp4',
    breezy: 'videos/windy.mp4',
    snow: 'videos/snowy.mp4',
    fog: 'videos/rainy.mp4',
    mist: 'videos/rainy.mp4',
    storm: 'videos/rainy.mp4',
    thunder: 'videos/rainy.mp4',
    hot: 'videos/sunny.mp4',
    cold: 'videos/cold.mp4',
    haze: 'videos/cold.mp4',
    clear:'videos/sunny.mp4'
  };

  // Find the corresponding video file based on weather condition
  let videoFile = weatherVideos.default; // Default video

  for (const condition in weatherVideos) {
    if (weatherCondition.includes(condition)) {
      videoFile = weatherVideos[condition];
      break;
    }
  }

  // Set the video source
  sourceElement.src = '/static/' + videoFile;

  // Load and play the video
  videoElement.load();
  videoElement.play();
  videoElement.playbackRate = 0.5;
  videoElement.classList.add('weather-condition-video');
}

function fetchWeatherData(city) {
  const url = `/weather?city=${encodeURIComponent(city)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data, city);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('city-input');
  const city = input.value;
  fetchWeatherData(city);
  input.value = '';
}

const form = document.getElementById('weather-form');
form.addEventListener('submit', handleSubmit);
