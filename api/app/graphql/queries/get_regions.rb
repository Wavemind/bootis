module Queries
  class GetRegions < Queries::BaseQuery
    type [Types::RegionType], null: true

    def resolve
      Place.regions.map { |region| { id: region.second, name: region.first } }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
