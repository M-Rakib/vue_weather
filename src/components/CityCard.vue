<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ place.city }}</h2>
            <h3>{{ place.state }}</h3>
        </div>

        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(place.weather.main.temp) }}&degC
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    H: {{ Math.round(place.weather.main.temp_max) }}&degC
                </span>
                <span class="text-xs">
                    H: {{ Math.round(place.weather.main.temp_min) }}&degC
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    place: {
        type: Object,
        default: () => {},
    }
})
</script>