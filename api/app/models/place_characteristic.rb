class PlaceCharacteristic < ActiveRecord::Base
  belongs_to :place
  belongs_to :characteristic
end