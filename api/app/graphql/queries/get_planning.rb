module Queries
  class GetPlanning < Queries::BaseQuery
    type Types::PlanningType, null: true

    argument :region, String, required: true
    argument :start_date, GraphQL::Types::ISO8601Date, required: true
    argument :end_date, GraphQL::Types::ISO8601Date, required: true

    def resolve(start_date:, end_date:, region:)
      {
        accommodation: Place.match_accomodation(region),
        schedule: (start_date...end_date).map do |date| 
          { 
            date: date, 
            activities: [Place.first]
          }
        end
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
