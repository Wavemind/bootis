class Place < ActiveRecord::Base
  belongs_to :category
  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics
  
  geocoded_by :full_address
  
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
    Place.joins(:category).where(region: region, categories: {section: 'lodging'}).order(Arel.sql('RANDOM()')).first
  end

  def self.match_activities(region, limit)
    Place.joins(:category).where(region: region).where.not(categories: {section: ['lodging', 'restaurant']}).order(Arel.sql('RANDOM()')).first
    Place.joins(:category).where(region: region).where.not(categories: {section: ['lodging', 'restaurant']}).order(Arel.sql('RANDOM()')).first
  end

  def full_address
    "#{street} #{number}, #{zip} #{city}"
  end 
end