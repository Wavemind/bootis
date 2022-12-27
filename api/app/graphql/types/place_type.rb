# frozen_string_literal: true

module Types
  class PlaceType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :zuerst_id, Integer
    field :region, String
    field :latitude, Float
    field :longitude, Float
    field :category, Types::CategoryType, null: false
    field :pictograms, [Types::PictogramType], null: false
    field :street, String, null: false
    field :zip, String, null: false
    field :city, String, null: false
    field :number, String, null: false
    field :full_address, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
