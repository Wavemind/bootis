module Queries
  class GetActivities < Queries::BaseQuery
    type [Types::PlaceType], null: true
    argument :region, String
    argument :categories, [ID], required: false

    def resolve(region:, categories:Category.all)
      Place.match_user(User.first, categories, regions: region)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
