desc "get weather data from Wunderground"
task :get_weather => :environment  do |t, args|
  WeatherCondition.get_current_weather
  puts "#{Time.now} Weather Updated"
end
