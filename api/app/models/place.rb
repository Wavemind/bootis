class Place < ActiveRecord::Base
  enum region: { zurich: 0, berne: 1, grisons: 2, valais: 3, lucerne: 4,
                 geneve: 5, leman: 6, tessin: 7, orientale: 8, bale: 9, argovie: 10, jura: 11, fribourg: 12, liechtenstein: 13 }

  belongs_to :category
  has_many :place_characteristics
  has_many :characteristics, through: :place_characteristics
  has_many :pictograms_places
  has_many :pictograms, through: :pictograms_places
  has_many :cuisines_places
  has_many :cuisines, through: :cuisines_places

  geocoded_by :full_address

  # This method takes a user, categories and regions
  # to return all relevant places that matches the user's characteristics
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
    Place.joins(:category).where(region:, categories: { section: 'lodging' }).sample
  end

  # Returns an array of places when given region, categories, limit, accommodation, and excluding parameters.
  #
  # Arguments:
  #   - region:          A string specifying the region to be searched.
  #   - categories:      An array of strings for specific categories to search for.
  #   - limit:           An integer specifying the max number of items the array should contain.
  #   - accommodation:   A string specifying the base location to search around.
  #   - excluding:       An array of activities to be excluded from the search.
  #
  # Returns:
  #   An array containing Places objects found within the given parameters.
  def self.match_activities(characteristics, region, categories, limit, accommodation, excluding = [])
    first = Place.match_characteristics(characteristics,
                                        Place.get_activities(excluding, region, categories)).sample
    unless first.present?
      first = Place.match_characteristics(characteristics,
                                          Place.get_activities(excluding,
                                                               region)).sample
    end
    unless first.present?
      first = Place.match_characteristics(characteristics,
                                          Place.get_activities(excluding).near(accommodation,
                                                                               150)).first
    end
    excluding << first

    restaurants = Place.match_characteristics(characteristics, Place.joins(:category).excluding(excluding).where(categories: { section: 'restaurant' }).near(first, 100)).slice(
      0, 2
    )

    others = Place.match_characteristics(characteristics, get_activities(excluding, region, categories).near(first)).slice(
      0, limit - 1
    )

    # If we don't find we don't care about categories
    if others.count < limit - 1
      others += Place.match_characteristics(characteristics, Place.get_activities(excluding, region).near(first, 150)).slice(
        0, limit - others.count - 1
      )
    end
    # If we don't find we don't care about region and categories
    if others.count < limit - 1
      others += Place.match_characteristics(characteristics, Place.get_activities(excluding).near(first, 150)).distinct(:name).slice(
        0, limit - others.count - 1
      )
    end

    [first, restaurants.first, others, restaurants.second].flatten
  end

  # This method takes an array of characteristics and places
  # and finds places with matching disability characteristics
  def self.match_characteristics(characteristics, places)
    matching_places = []
    places.each do |place|
      matching_places.push(place.id) if place.match_characteristics?(characteristics)
    end
    places.where(id: matching_places)
  end

  # Match the user characteristics of the place with the places characteristics
  def match_characteristics?(characteristics)
    filled_characteristics = characteristics.keys

    place_characteristics.where(characteristic_id: filled_characteristics).find_each do |place_characteristic|
      next if place_characteristic.value.nil?

      case place_characteristic.characteristic.value_type
      when 'more'
        unless characteristics[place_characteristic.characteristic_id] >= place_characteristic.value
          return false
        end
      when 'less'
        unless characteristics[place_characteristic.characteristic_id] <= place_characteristic.value
          return false
        end
      when 'equal'
        return false unless place_characteristic.value == 1.0
      end
    end
    true
  end

  # Creates a request to fetch activities based on region and categories
  def self.get_activities(excluding, region = Place.regions.map(&:first), categories = Category.all)
    includes([:category]).excluding(excluding).joins(:category).where(categories:,
                                                                      region:).where.not(categories: { section: [
                                                                                           'lodging', 'restaurant'
                                                                                         ] })
  end

  # Full address for place's location
  def full_address
    "#{street} #{number}, #{zip} #{city}"
  end
end
