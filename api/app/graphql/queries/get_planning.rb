module Queries
  class GetPlanning < Queries::BaseQuery
    type Types::PlanningType, null: true

    argument :region, String
    argument :categories, [ID], required: false
    argument :start_date, GraphQL::Types::String
    argument :end_date, GraphQL::Types::String
    argument :characteristics, [Types::Input::CharacteristicInputType]

    def resolve(start_date:, end_date:, region:, characteristics:, categories: Category.all)
      excluding = []
      accommodation = Place.match_accomodation(region)
      formated_characteristics = UserCharacteristic.format_characteristics(characteristics)
      {
        accommodation: accommodation,
        schedule: (Time.zone.parse(start_date).to_date..Time.zone.parse(end_date).to_date).map do |date| 
          activities = Place.match_activities(formated_characteristics, region, categories, 3, accommodation, excluding)
          
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
