class AddKeyToCharacteristic < ActiveRecord::Migration[7.0]
  def change
    add_column :characteristics, :key, :string
  end
end
