module Types
  class RegionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
  end
end
