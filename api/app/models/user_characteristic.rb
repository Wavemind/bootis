class UserCharacteristic < ActiveRecord::Base
  belongs_to :user
  belongs_to :characteristic

  def self.match_place(user_chars, place_chars)
    user_chars.each do |user_char|
      place_char = place_chars.find_by(characteristic_id: user_char.characteristic_id)
      return false if place_char.nil? || place_char.value.nil? ||
        (place_char.characteristic.more? && user_char.value < place_char.value) ||
        (place_char.characteristic.less? && user_char.value > place_char.value) ||
        (place_char.characteristic.equal? && user_char.value != place_char.value)
    end
    true
  end
end