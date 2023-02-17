module Types
  module Input
    class CharacteristicInputType < Types::BaseInputObject
      argument :key, GraphQL::Types::String
      argument :answer, Types::BaseScalar, required: false
    end
  end
end
