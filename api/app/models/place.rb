class Place < ActiveRecord::Base
  enum region: [:zurich, :berne, :grisons, :valais, :lucerne, :geneve, :leman, :tessin, :orientale, :bale, :argovie, :jura, :fribourg, :liechtenstein]

  belongs_to :category
  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics
  has_many :pictograms_places
  has_many :pictograms, through: :pictograms_places
  has_many :cuisines_places
  has_many :cuisines, through: :cuisines_places
  
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

  # Finds an accomodation based on the region we are looking in
  def self.match_accomodation(region)
    Place.joins(:category).where(region: region, categories: {section: 'lodging'}).order(Arel.sql('RANDOM()')).first
  end

  # Will retrive `limit` amout of activities based on the categories and the region we are looking in
  def self.match_activities(region, categories, limit, accommodation, excluding = [])
    first = Place.get_activities(excluding, region, categories).sample
    first = Place.get_activities(excluding, region).sample unless first.present?
    first = Place.get_activities(excluding).near(accommodation).first unless first.present?
    excluding << first
    
    restaurants = Place.joins(:category).where(categories: {section: 'restaurant'}).near(first).slice(0,2)
    others = Place.get_activities(excluding, region, categories).near(first).distinct(:name).slice(0, limit - 1)

    # If we don't find we don't care about categories
    others +=  Place.get_activities(excluding, region).near(first).distinct(:name).slice(0, limit -  others.count) if others.count < limit - 1
    # If we don't find we don't care about region and categories
    others +=  Place.get_activities(excluding).near(first).distinct(:name).slice(0, limit -  others.count) if others.count < limit - 1

    [first, restaurants.first, others, restaurants.second].flatten
  end

  def self.match_characteristics(characteristics)
    matching_places = []
    filled_characteristics = characteristics.keys
    Place.all.each do |place|
      place_matching = true
      place.place_characteristics.where(characteristic_id: filled_characteristics).each do |place_characteristic|
        case place_characteristic.characteristic.value_type
        when 'more'
          place_matching = false unless characteristics[place_characteristic.characteristic_id] > place_characteristic.value
        when 'less'
          place_matching = false unless characteristics[place_characteristic.characteristic_id] < place_characteristic.value
        when 'equal'
          place_matching = false unless place_characteristic.value == 1.0
        end
      end
      matching_places.push(place.id) if place_matching
    end
    Place.find(matching_places)
  end

  # Creates a request to fetch activities based on region and categories
  def self.get_activities(excluding, region = Place.regions.map(&:first), categories = Category.all)
    Place.excluding(excluding).joins(:category).where(region: region).where(categories: categories).where.not(categories: {section: ['lodging', 'restaurant']})
  end

  # Full address for place's location
  def full_address
    "#{street} #{number}, #{zip} #{city}"
  end 
end
