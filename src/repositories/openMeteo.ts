interface Result<T> {
    results?: T[]
}

interface Geo {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country_code: number
}

interface Weather {
    latitude: number;
    longitude: number;
    elevation: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly: Record<string, any>;
    hourly_units: Record<string, string>;
}

export const WeatherCodeDesc: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: light",
    53: "Drizzle: moderate",
    55: "Drizzle: dense intensity",
    56: "Freezing Drizzle: light",
    57: "Freezing Drizzle: dense intensity",
    61: "Rain: slight",
    63: "Rain: moderate",
    65: "Rain: heavy intensity",
    66: "Freezing Rain: light",
    67: "Freezing Rain: heavy intensity",
    71: "Snow fall: slight",
    73: "Snow fall: moderate",
    75: "Snow fall: heavy intensity",
    77: "Snow grains",
    80: "Rain showers: slight",
    81: "Rain showers: moderate",
    82: "Rain showers: violent",
    85: "Snow showers: slight",
    86: "Snow showers: heavy",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm: slight",
    99: "Thunderstorm: heavy hail",
} as const;

export class OpenMeteo {
    public async getGeo(city: string) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

        const resp = await fetch(url)
        const data: Result<Geo> = await resp.json()
        return data.results?.[0]
    }

    public async getCurrentWeather(latitude: number, longitude: number) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,weather_code&forecast_days=1&timeformat=unixtime`

        const resp = await fetch(url)
        const data: Weather = await resp.json()
        return data
    }
}