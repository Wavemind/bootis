module Queries
  class GetPdf < Queries::BaseQuery
    # type [Types::PlaceType], null: true
    argument :planning, String

    def resolve(planning:)
      pdf = PlanningGeneratorPdf.new
      pdf.generate(planning)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.record.errors.full_messages.join(', '))
    end
  end
end
