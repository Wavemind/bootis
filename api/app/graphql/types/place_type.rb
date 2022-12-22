# frozen_string_literal: true

module Types
  class PlaceType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :zuerst_id, Integer
    field :region, String
    field :latitude, Float
    field :longitude, Float
    field :category_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
