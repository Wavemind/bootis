module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :get_regions, resolver: Queries::GetRegions, description: "Return the list of regions"
    field :get_categories_by_region, resolver: Queries::GetCategoriesByRegion, description: "Return the list of categories by selected region"
    field :get_activity_categories, resolver: Queries::GetActivityCategories, description: "Return the list of activity categories"
    field :get_accommodation_categories, resolver: Queries::GetAccommodationCategories, description: "Return the list of accommodation categories"
    field :get_activities, resolver: Queries::GetActivities, description: "Return the list of activities"
    field :get_places, resolver: Queries::GetPlaces, description: "Return the list of places by region and category"
    field :get_restaurants, resolver: Queries::GetRestaurants, description: "Return the list of restaurants by cuisine"
    field :get_accommodations, resolver: Queries::GetAccommodations, description: "Return the list of accommodations by region"
    field :get_cuisine, resolver: Queries::GetCuisine, description: "Return the list of all cuisine type avalable"
    field :get_planning, resolver: Queries::GetPlanning, description: "Return the planning of activities for given date + accomodation"
  end
end
