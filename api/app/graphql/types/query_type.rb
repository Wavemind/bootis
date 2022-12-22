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
    field :get_categories_by_region, resolver: Queries::GetCategoriesByRegion, description: "Return the list of categories by selected region"
    field :get_activity_categories, [Types::CategoryType], null: false, description: "Return the list of activity categories"

    def places
      Place.all
    end

    def get_regions
      regions = []
      Place.regions.each { |region| regions << { id: region[1], name: region[0] } }
      regions
    end

    def get_activity_categories
      Category.all.reject{ |category| ['lodging', 'restaurant'].include?(category.section) }
    end

    def get_sections
      sections = []
      Category.sections.each { |section| sections << { id: section[1], name: section[0] }}
      sections
    end
  end
end
