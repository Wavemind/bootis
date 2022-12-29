class AddPictureUrlToPlace < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :picture_url, :string
  end
end
