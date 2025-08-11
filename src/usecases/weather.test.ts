import { OpenMeteo, WeatherCodeDesc } from '@/repositories';
import { describe, expect, it, vi } from 'vitest';
import { mock } from "vitest-mock-extended";
import { Weather } from './weather';

describe('Weather', () => {
  it('should return current weather data for valid city', async () => {
    const currentUnix = Math.floor(Date.now() / 1000)
    const openMeteoMock = {
      getGeo: vi.fn().mockResolvedValue({ latitude: 25, longitude: 121 }),
      getCurrentWeather: vi.fn().mockResolvedValue({
        hourly: {
          weather_code: [1],
          time: [currentUnix],
          temperature_2m: [22],
          relative_humidity_2m: [55],
          dew_point_2m: [12],
        },
        hourly_units: {
          temperature_2m: '°C',
          relative_humidity_2m: '%',
          dew_point_2m: '°C',
        },
      }),
    };

    const weather = new Weather(openMeteoMock)

    const city = 'Taipei'
    const result = await weather.getCurrentWeather(city)

    expect(result.city).toBe(city)
    expect(result.datetime).toBe(new Date(currentUnix * 1000).toISOString())
    expect(result.weather_code_name).toBe(WeatherCodeDesc[1])
    expect(result.temperature).toBe('22°C')
    expect(result.relative_humidity).toBe('55%')
    expect(result.dew_point).toBe('12°C')
  })

  it('should throw error when city geo not found', async () => {
    const openMeteoMock = mock<OpenMeteo>()
    const weather = new Weather(openMeteoMock)

    await expect(weather.getCurrentWeather('UnknownCity')).rejects.toThrow(
      'Could not retrieve weather information for UnknownCity'
    )
  })
})
