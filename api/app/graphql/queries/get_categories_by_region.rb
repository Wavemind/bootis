module Queries
  class GetCategoriesByRegion < Queries::BaseQuery
    type [Types::CategoryType], null: true
    argument :region, String

    def resolve(region:)
      Category.includes(:places).where(places: {region: region}).reject{ |category| ['lodging', 'restaurant'].include?(category.section) }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
