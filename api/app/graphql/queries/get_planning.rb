module Queries
  class GetPlanning < Queries::BaseQuery
    type Types::PlanningType, null: true

    argument :region, String
    argument :categories, [ID], required: false
    argument :start_date, GraphQL::Types::ISO8601Date
    argument :end_date, GraphQL::Types::ISO8601Date

    def resolve(start_date:, end_date:, region:, categories: Category.all)
      excluding = []
      {
        accommodation: Place.match_accomodation(region),
        schedule: (start_date...end_date).map do |date| 
          activities = Place.match_activities(region, categories, 3, excluding)
          excluding += activities 
          { 
            date: date, 
            activities: activities
          }
        end
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
