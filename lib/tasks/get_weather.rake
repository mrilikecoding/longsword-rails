namespace :weather do

  desc "get weather data from Wunderground"
  task :fetch => :environment  do
    WeatherCondition.get_current_weather
    puts "#{Time.now} Weather Updated"
  end

  desc "destroy weather records older than 4 days"
  task :prune_old_records => :environment do
    WeatherCondition.where("created_at < :week", {:week => 1.week.ago}).destroy_all
  end

end
