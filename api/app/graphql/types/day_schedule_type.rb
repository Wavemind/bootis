# frozen_string_literal: true

module Types
  class DayScheduleType < Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date
    field :activities, [Types::PlaceType]
  end
end
