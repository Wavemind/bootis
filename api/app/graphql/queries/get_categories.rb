module Queries
  class GetCategories < Queries::BaseQuery
    type [Types::CategoryType], null: true
    argument :region, String

    def resolve(region:)
      Category.includes(:places).where(places: {region: region})
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
