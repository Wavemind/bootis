class Characteristic < ActiveRecord::Base
  enum value_type: [:boolean, :more, :less, :equal]

  has_many :place_characteristics
  has_many :places, through: :place_characteristics
  has_many :user_characteristics
  has_many :users, through: :user_characteristics
end