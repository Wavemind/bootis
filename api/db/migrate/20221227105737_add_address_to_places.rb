class AddAddressToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :street, :string
    add_column :places, :number, :string
    add_column :places, :zip, :string
    add_column :places, :city, :string
  end
end
