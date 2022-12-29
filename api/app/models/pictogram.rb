class Pictogram < ApplicationRecord
  has_many :pictograms_places
  has_many :places, through: :pictograms_places
  
end
