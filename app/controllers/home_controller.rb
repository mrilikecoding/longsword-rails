class HomeController < ApplicationController

  def index

    conditions = {}
    forecast = {}
    sunset = {}

    # conditions = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{ENV['WUNDERGROUND_KEY']}/conditions/q/pws:KORJACKS10.json"))
    # forecast = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{ENV['WUNDERGROUND_KEY']}/forecast/q/pws:KORJACKS10.json"))
    # sunset = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{ENV['WUNDERGROUND_KEY']}/astronomy/q/pws:KORJACKS10.json"))

    @current_temp = conditions["current_observation"].present? ? conditions["current_observation"]["temp_f"] : 74.04
    @current_weather = conditions["current_observation"].present? ? conditions["current_observation"]["weather"] : "clear"
    @icon = conditions["current_observation"].present? ? conditions["current_observation"]["icon"] : "clear"

    @after_sunset = sunset["sun_phase"].present? ? (sunset["sun_phase"]["sunset"]["hour"].to_i > Time.now.hour) : false
    @before_sunrise = sunset["sun_phase"].present? ? (Time.now.hour <= sunset["sun_phase"]["sunrise"]["hour"].to_i) : false
    @after_close =  Time.now.hour >= 17 || Time.now.hour < 3

    @high = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][0]["high"]["fahrenheit"] : 74.04
    @high_tomorrow = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][1]["high"]["fahrenheit"] : 74.04
    @forecast = forecast["forecast"].present? ? forecast["forecast"]["simpleforecast"]["forecastday"][0]["conditions"] : "clear"


    render "home/home"
  end

end


