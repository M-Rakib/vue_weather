<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :place="city" @click="goToCityView(city)"/>        
    </div>
    <p v-if="savedCities.length == 0">
        No locations added. To start tracking a location, search in the field above.
    </p>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import CityCard from "../components/CityCard.vue";
import { useRouter } from "vue-router"

const savedCities = ref([])

const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(
            localStorage.getItem("savedCities")
        )

        const requests = []
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lng}&appid=0fb5b88bb19138a8b1231871b86f588c&units=metric`
                )
            )
        });

        
        const weatherData = await Promise.all(requests);
        weatherData.forEach((request, index) => {
            savedCities.value[index].weather = request.data
        });
        console.log("These are the cities with their data", savedCities.value)
    }

    // Flicker Delay
    await new Promise((res) => setTimeout(res, 800))
}

await getCities();
const router = useRouter()
const goToCityView = (city) => {
    router.push({
        name: "CityView",
        params: { state: city.state, city: city.city },
        query: { lat: city.coord.lat, lng: city.coord.lng, id: city.id }
    })
};
</script>