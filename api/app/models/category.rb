class Category < ActiveRecord::Base
  enum section: [:lodging, :restaurant, :shopping, :cinema_theatre_concert, :museum, :outside_activity, :sport]
end