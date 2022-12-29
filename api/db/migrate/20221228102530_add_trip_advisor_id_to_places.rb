class AddTripAdvisorIdToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :trip_advisor_id, :integer
  end
end
