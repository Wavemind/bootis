class CreatePlaceCharacteristic < ActiveRecord::Migration[7.0]
  def change
    create_table :place_characteristics do |t|
      t.belongs_to :place, null: false, foreign_key: true
      t.belongs_to :characteristic, null: false, foreign_key: true
      t.float :value

      t.timestamps
    end
  end
end
