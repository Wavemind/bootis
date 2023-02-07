module Queries
  class GetAccommodations < Queries::BaseQuery
    type [Types::PlaceType], null: true
    argument :region, String

    def resolve(region:)
      Place.joins(:category).where(region: region, categories: {section: 'lodging'})
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
