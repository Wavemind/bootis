class CreateCharacteristic < ActiveRecord::Migration[7.0]
  def change
    create_table :characteristics do |t|
      t.string :label
      t.integer :value_type

      t.timestamps
    end
  end
end
