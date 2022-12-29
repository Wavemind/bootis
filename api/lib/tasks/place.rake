namespace :place do
  desc "TODO"
  task update_tripadvisor_id: :environment do
    Place.joins(:category).where(categories: {section: 'restaurant'}).each do |place|
      next if place.trip_advisor_id.present?

      url = URI("https://api.content.tripadvisor.com/api/v1/location/search?language=fr&key=#{ENV['TRIP_ADVISOR_KEY']}&searchQuery=#{ERB::Util.url_encode(place.name)}&#{ERB::Util.url_encode(place.full_address)}&latLong=#{place.latitude}%2C#{place.longitude}")
      
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      
      request = Net::HTTP::Get.new(url)
      request["accept"] = 'application/json'
       
      response = http.request(request)
      begin
        body = JSON.parse(response.read_body)
        place.update!(trip_advisor_id: body["data"].first["location_id"]) if(body["data"].any?) && string_difference_percent(place.street,body["data"].first["address_obj"]["street1"]) < 0.2
        puts " Found trip advisor_id for #{place.id} - #{place.name}"
      rescue
        puts "Failed to get trip advisor id for place #{place.id} - #{place.name}"
      end
    end
  end

  task update_food_category: :environment do
    total =  Place.joins(:category).where(categories: {section: 'restaurant'}).where.not(trip_advisor_id: nil).count
    Place.joins(:category).where(categories: {section: 'restaurant'}).where.not(trip_advisor_id: nil).each_with_index do |place, index|
      

      url = URI("https://api.content.tripadvisor.com/api/v1/location/#{place.trip_advisor_id}/details?key=#{ENV['TRIP_ADVISOR_KEY']}&language=fr&currency=CHF")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(url)
      request["accept"] = 'application/json'

      response = http.request(request)
      begin
        body = JSON.parse(response.read_body)
        place.cuisines += body["cuisine"].map {|cuisine| Cuisine.find_or_create_by(label:cuisine["name"], name: cuisine["localized_name"])}
        puts "#{index}/#{total} Found trip cuisine for #{place.id} - #{place.name} we assignes #{place.cuisines.map(&:name).join(",")}"
      rescue => error
        puts "Failed to get cuisine for place #{place.id} - #{place.name}"
        puts error
      end
    end
  end

  def string_difference_percent(a, b)
    longer = [a.size, b.size].max
    same = a.each_char.zip(b.each_char).count { |a,b| a == b }
    (longer - same) / a.size.to_f
  end
end

