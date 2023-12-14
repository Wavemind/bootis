module Queries
  class GetActivityCategories < Queries::BaseQuery
    type [Types::CategoryType], null: true

    def resolve
      Category.where.not(section: ['lodging', 'restaurant'])
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
