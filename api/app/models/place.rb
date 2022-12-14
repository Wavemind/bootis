class Place < ActiveRecord::Base
  enum region: [:zurich, :berne, :grisons, :valais, :lucerne, :geneve, :leman, :tessin, :orientale, :bale, :argovie, :jura, :fribourg, :liechtenstein]
  belongs_to :category

  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics

  def self.match_user(user, regions: Place.regions.keys)
    places = []
    user_chars = user.user_characteristics
    answered_chars = user_chars.map(&:characteristic_id)
    Place.where(region: regions).includes(place_characteristics: :characteristic).each do |place|
      place_chars = place.place_characteristics
      places.push(place) if (answered_chars - place_chars).any? && UserCharacteristic.match_place(user_chars, place_chars)
    end
    places
  end
end