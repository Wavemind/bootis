module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :places, [Types::PlaceType], null: false, description: "Return a list of places"
    field :get_regions, [Types::RegionType], null: false, description: "Return the list of regions"
    field :get_sections, [Types::SectionType], null: false, description: "Return the list of sections"
    field :get_categories, resolver: Queries::GetCategories, description: "Return the list of categories"

    def places
      Place.all
    end

    def get_regions
      regions = []
      Place.regions.each { |region| regions << { id: region[1], name: region[0] } }
      regions
    end

    def get_sections
      sections = []
      Category.sections.each { |section| sections << { id: section[1], name: section[0] }}
      sections
    end
  end
end
