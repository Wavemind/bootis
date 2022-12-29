class CreateCuisines < ActiveRecord::Migration[7.0]
  def change
    create_table :cuisines do |t|
      t.string :label
      t.string :name
      t.timestamps
    end
    create_join_table :cuisines, :places
  end
end
