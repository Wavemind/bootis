module Queries
  class GetPlanning < Queries::BaseQuery
    type Types::PlanningType, null: true

    argument :region, String, required: true
    argument :start_date, GraphQL::Types::ISO8601Date, required: true
    argument :end_date, GraphQL::Types::ISO8601Date, required: true

    def resolve(start_date:, end_date:, region:)
      excluding = []
      {
        accommodation: Place.match_accomodation(region),
        schedule: (start_date...end_date).map do |date| 
          activities = Place.match_activities(region, 3)
          excluding += activities 
          { 
            date: date, 
            activities: Place.match_activities(region, 3, excluding)
          }
        end
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
