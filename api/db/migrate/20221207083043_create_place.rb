class CreatePlace < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.string :name
      t.integer :zuerst_id
      t.integer :region
      t.float :latitude
      t.float :longitude
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
