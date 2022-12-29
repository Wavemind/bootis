class CuisinesPlace < ApplicationRecord
  belongs_to :cuisine
  belongs_to :place  
end
