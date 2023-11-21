<template>
    <div class="flex flex-col flex-1 items-center">
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>You are currently previewing the city, click the "+" icon to start tracking the city.</p>
        </div>
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2"> {{  route.params.city }}</h1>
            <p class="text-sm mb-12">
                {{ new Date().toLocaleDateString("en-GB", 
                    {weekday: "short",
                    day: "2-digit",
                    month: "long"}) 
                }}
                {{
                    new Date().toLocaleTimeString("en-GB", {
                        timeStyle: "short"
                    })

                 }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.current.temp) }}&degC
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.current.feels_like) }}&degC
            </p>
            <p class="capitalize">
                {{ weatherData.current.weather[0].description }}
            </p>
            <img class="w-[150px] h-auto" :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`">
        </div>  
        
        <hr class="border-white border-opacity-10 border w-full">

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly.slice(0,15)" :key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-md">
                            {{new Date(hourData.dt * 1000).toLocaleTimeString("en-us", {
                                hour: "numeric"
                            })}}
                        </p>
                        <img :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" class="w-auto h-[50px] object-cover">
                        <p class="text-xl"> {{ Math.round(hourData.temp) }}&degC</p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full">

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{ 
                            new Date(day.dt * 1000).toLocaleDateString("en-us", {
                                weekday: "long",
                            })    
                        }}
                    </p>
                    <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" class="w-[50px] h-[50px] object-cover">
                    <div class="flex gap-3 flex-1 justify-end">
                        <p>H: {{ Math.round(day.temp.max) }}&degC</p>
                        <p>L: {{ Math.round(day.temp.min) }}&degC</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
            <i class="fa-solid fa-trash"></i> 
            <p>Remove City</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=0fb5b88bb19138a8b1231871b86f588c&units=metric`)

        // Flicker Delay
        await new Promise((res) => setTimeout(res, 800))
        
        return weatherData.data
    } catch (err) {
        console.log(err)
    }

}

const weatherData = await getWeatherData()
console.log(weatherData)

const router = useRouter()
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updatedCities = cities.filter((city) => city.id !== route.query.id)

    localStorage.setItem("savedCities", JSON.stringify(updatedCities))

    router.push({
        name: "home"
    })
};
</script>