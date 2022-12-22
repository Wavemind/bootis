module Queries
  class GetRegions < Queries::BaseQuery
    type [Types::RegionType], null: true

    def resolve
      Place.regions.map { |region| { id: region[1], name: region[0] } }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
