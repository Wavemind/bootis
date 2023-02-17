module Queries
  class GetPlanning < Queries::BaseQuery
    type Types::PlanningType, null: true

    argument :region, String
    argument :categories, [ID], required: false
    # argument :characteristics, GraphQL::Types::String
    argument :start_date, GraphQL::Types::String
    argument :end_date, GraphQL::Types::String
    argument :characteristics, [Types::Input::CharacteristicInputType]

    def resolve(start_date:, end_date:, region:, characteristics:, categories: Category.all)
      excluding = []
      accommodation = Place.match_accomodation(region)
      {
        accommodation: accommodation,
        schedule: (Time.zone.parse(start_date).to_date..Time.zone.parse(end_date).to_date).map do |date| 
          activities = Place.match_activities(region, categories, 3, accommodation, excluding)
          excluding += activities 
          { 
            date: date,
            activities: activities
          }
        end
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    rescue NoMethodError => e
      GraphQL::ExecutionError.new(e)
    end
  end
end
