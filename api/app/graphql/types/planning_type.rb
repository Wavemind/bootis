# frozen_string_literal: true

module Types
  class PlanningType < Types::BaseObject
    field :accommodation, Types::PlaceType
    field :schedule, [Types::DayScheduleType]
  end
end
