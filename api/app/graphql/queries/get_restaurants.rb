module Queries
  class GetRestaurants < Queries::BaseQuery
    type [Types::PlaceType], null: true
    argument :region, String
    argument :cuisines, [ID], required: false

    def resolve(region:, cuisines: [])
      Place.joins(:category, :cuisines).where(region: region, categories: {section: 'restaurant'}, cuisines: cuisines)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
