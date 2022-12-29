module Queries
  class GetRestaurants < Queries::BaseQuery
    type [Types::PlaceType], null: true
    argument :region, String
    argument :cuisines, [ID], required: false

    def resolve(region:, cuisines: [])
      Place.where(region: region, cuisines: cuisines)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
