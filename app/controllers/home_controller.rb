require 'json'

class HomeController < ApplicationController

  def index

    weather = WeatherCondition.last
    @weather_available = WeatherCondition.count > 0

    def valid_json?(json)
      begin
        JSON.parse(json)
        return true
      rescue JSON::ParserError
        return false
      end
    end

    if @weather_available && valid_json?(weather)
      conditions = JSON.parse(weather.conditions)
      forecast = JSON.parse(weather.forecast)
      astronomy = JSON.parse(weather.astronomy)

      @current_temp = conditions["current_observation"].present? ? conditions["current_observation"]["temp_f"] : 74.04
      @current_weather = conditions["current_observation"].present? ? conditions["current_observation"]["weather"] : "clear"
      @icon = conditions["current_observation"].present? ? conditions["current_observation"]["icon"] : "clear"

      @after_sunrise = astronomy["sun_phase"].present? ? (astronomy["sun_phase"]["sunrise"]["hour"].to_i > Time.now.hour) : false
      @before_sunrise = astronomy["sun_phase"].present? ? (Time.now.hour <= astronomy["sun_phase"]["sunrise"]["hour"].to_i) : false
      @after_close =  Time.now.hour >= 17 || Time.now.hour < 3

      @high = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][0]["high"]["fahrenheit"] : 74.04
      @high_tomorrow = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][1]["high"]["fahrenheit"] : 74.04
      @forecast = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][0]["conditions"] : "clear"
    else
      @weather_available = false
    end

    render "home/home"
  end

end


