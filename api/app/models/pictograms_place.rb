class PictogramsPlace < ApplicationRecord
  belongs_to :pictogram
  belongs_to :place  
end
