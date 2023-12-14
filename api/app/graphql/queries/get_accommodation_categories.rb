module Queries
  class GetAccommodationCategories < Queries::BaseQuery
    type [Types::CategoryType], null: true

    def resolve
      Category.where(section: 'lodging')
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
