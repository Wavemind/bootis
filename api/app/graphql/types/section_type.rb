module Types
  class SectionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
  end
end
