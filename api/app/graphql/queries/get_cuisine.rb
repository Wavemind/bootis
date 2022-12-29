module Queries
  class GetCuisine < Queries::BaseQuery
    type [Types::CuisineType], null: true

    
    def resolve()
      Cuisine.all
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
