import { OpenMeteo, WeatherCodeDesc } from "@/repositories";

export class Weather {
    private readonly openMeteo = new OpenMeteo()

    private getClosestUtcIndex(hourlyTimes: number[]): number {
        const currentTime = Math.floor(Date.now() / 1000)

        return hourlyTimes.reduce((closestIndex, date, i) => {
            const closestDiff = Math.abs(hourlyTimes[closestIndex] - currentTime);
            const currentDiff = Math.abs(date - currentTime);
            return currentDiff < closestDiff ? i : closestIndex;
        }, 0);
    }
    public async getCurrentWeather(city: string) {
        const geo = await this.openMeteo.getGeo(city)
        if (geo === undefined) {
            throw new Error(`Could not retrieve weather information for ${city}`)
        }

        const weather = await this.openMeteo.getCurrentWeather(geo.latitude, geo.longitude)

        const { weather_code, time, temperature_2m, relative_humidity_2m, dew_point_2m } = weather.hourly

        const idx = this.getClosestUtcIndex(time)

        const datetime = new Date(time[idx] * 1000).toISOString();
        const weather_code_name = WeatherCodeDesc[weather_code[idx]]
        const temperature = temperature_2m[idx] + weather.hourly_units.temperature_2m
        const relative_humidity = relative_humidity_2m[idx] + weather.hourly_units.relative_humidity_2m
        const dew_point = dew_point_2m[idx] + weather.hourly_units.dew_point_2m

        return { city, datetime, weather_code_name, temperature, relative_humidity, dew_point }
    }
}