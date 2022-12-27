class CreatePictograms < ActiveRecord::Migration[7.0]
  def change
    create_table :pictograms do |t|
      t.string :name
      t.string :link
      t.string :link_svg
      t.timestamps
    end
    create_join_table :pictograms, :places
  end
end
