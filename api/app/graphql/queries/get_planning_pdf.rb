module Queries
  class GetPlanningPdf < Queries::BaseQuery
    type Types::PdfType, null: true
    
    argument :schedule, GraphQL::Types::JSON

    def resolve(schedule:)
      pdf = PlanningGeneratorPdf.new
      pdf.generate(schedule)
      {
        url: pdf.generate(planning),
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
