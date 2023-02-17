module Queries
  class GetPlanningPdf < Queries::BaseQuery
    type Types::PdfType, null: true
    
    argument :planning, GraphQL::Types::JSON

    def resolve(planning:)
      pdf = PlanningGeneratorPdf.new
      {
        url: pdf.generate(planning).gsub("public/",""),
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
