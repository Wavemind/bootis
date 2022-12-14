class CreateCategory < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.integer :section
      t.string :name

      t.timestamps
    end
  end
end
