module Queries
  class GetCategories < Queries::BaseQuery
    type [Types::Category]
    argument :region, String

    def resolve
      Category.all
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
