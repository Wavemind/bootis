class Place < ActiveRecord::Base
  enum region: [:zurich, :berne, :grisons, :valais, :lucerne, :geneve, :leman, :tessin, :orientale, :bale, :argovie, :jura, :fribourg, :liechtenstein]
  belongs_to :category

  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics

  def self.match_user(user, categories, regions: Place.regions.keys)
    places = Place.where(region: regions).where(category: categories).includes(place_characteristics: :characteristic)
    user_chars = user.user_characteristics
    answered_chars = user_chars.map(&:characteristic_id)
    places.select do |place|
      place_chars = place.place_characteristics
      (answered_chars - place_chars).any? && UserCharacteristic.match_place(user_chars, place_chars)
    end
    places
  end

  def self.match_accomodation(region)
    Place.where(region: region).order(Arel.sql('RANDOM()')).first
  end

  def full_address
    "#{street} #{number}, #{zip} #{city}"
  end 
end