class Category < ActiveRecord::Base
  has_many :places
  enum section: [:lodging, :restaurant, :shopping, :cinema_theatre_concert, :museum, :outside_activity, :sport]
end