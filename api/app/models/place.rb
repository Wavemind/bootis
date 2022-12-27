class Place < ActiveRecord::Base
  enum region: [:zurich, :berne, :grisons, :valais, :lucerne, :geneve, :leman, :tessin, :orientale, :bale, :argovie, :jura, :fribourg, :liechtenstein]

  belongs_to :category
  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics
  has_many :pictograms_places
  has_many :pictograms, through: :pictograms_places
  
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

  def self.match_activities(region, limit, excluding = [])
    first = Place.excluding(excluding).joins(:category).where(region: region).where.not(categories: {section: ['lodging', 'restaurant']}).sample
    excluding << first
    restaurants = Place.joins(:category).where(region: region).where(categories: {section: 'restaurant'}).near(first).slice(0,2)
    others = Place.excluding(excluding).joins(:category).where(region: region).where.not(categories: {section: ['lodging', 'restaurant']}).near(first).slice(0, limit - 1)
    [first, restaurants.first, others, restaurants.last].flatten
  end

  def full_address
    "#{street} #{number}, #{zip} #{city}"
  end 
end 