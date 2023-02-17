module Queries
  class GetPlanningPdf < Queries::BaseQuery
    type Types::PdfType, null: true
    
    argument :schedule, GraphQL::Types::JSON

    def resolve(schedule:)
      {
        url: Place.generate_planning.gsub("public/",""),
      }
    end
  end
end
