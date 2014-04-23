class CreateWeatherConditions < ActiveRecord::Migration
  def change
    create_table :weather_conditions do |t|
      t.text :conditions
      t.text :forecast
      t.text :astronomy

      t.timestamps
    end
  end
end
