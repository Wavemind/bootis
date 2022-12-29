class Cuisine < ApplicationRecord
  has_many :cuisines_places
  has_many :places
end
