class WeatherCondition < ActiveRecord::Base

  def self.get_current_weather
    key = ENV['WUNDERGROUND_KEY']
    puts "Fetching weather... "

    conditions = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{key}/conditions/q/pws:KORJACKS10.json"))
    forecast = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{key}/forecast/q/pws:KORJACKS10.json"))
    astronomy = HTTParty.get(URI.encode("http://api.wunderground.com/api/#{key}/astronomy/q/pws:KORJACKS10.json"))

    weather = WeatherCondition.new(:conditions => conditions.to_json, :forecast => forecast.to_json, :astronomy => astronomy.to_json)
    weather.save!

    if weather.save
      puts "Success"
    end

  end


  def self.test
    puts "hello world"
  end

end
