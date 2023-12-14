puts "-- Deleting existing data ..."
UserCharacteristic.destroy_all
User.destroy_all
PlaceCharacteristic.destroy_all
Place.destroy_all
Characteristic.destroy_all
Category.destroy_all
Pictogram.destroy_all

puts "-- Create users ..."
wavemind_user = User.create(email: 'dev@wavemind.ch ', password: 'Galilee15', password_confirmation: 'Galilee15')

data = JSON.parse(File.read(Rails.root.join('db/zuerst.json')))

puts "-- Create categories ..."
camping = Category.create!({ name: 'Camping', section: 'lodging' })
hostel = Category.create!({ name: 'Hôtel, pension, Bed and Breakfast', section: 'lodging' })
house = Category.create!({ name: 'Maison ou appartement de vacances', section: 'lodging' })
restaurant = Category.create!({ name: 'Restaurant, café, bar', section: 'restaurant' })
mall = Category.create!({ name: 'Centre commercial', section: 'shopping' })
commerce = Category.create!({ name: 'Commerce', section: 'shopping' })
cinema = Category.create!({ name: 'Cinéma', section: 'cinema_theatre_concert' })
concert = Category.create!({ name: 'Salle de concert, opéra, Théâtre', section: 'cinema_theatre_concert' })
museum = Category.create!({ name: 'Musée ou galerie', section: 'museum' })
garden = Category.create!({ name: 'Jardin botanique', section: 'outside_activity' })
park = Category.create!({ name: 'Parc ou cimetière', section: 'outside_activity' })
playground = Category.create!({ name: 'Place de jeux', section: 'outside_activity' })
pov = Category.create!({ name: 'Point de vue', section: 'outside_activity' })
zoo = Category.create!({ name: 'Zoo', section: 'outside_activity' })
sport = Category.create!({ name: 'Halle de sport', section: 'sport' })
rink = Category.create!({ name: 'Patinoire', section: 'sport' })
pool = Category.create!({ name: 'Piscine', section: 'sport' })
lifts = Category.create!({ name: 'Remontées mécaniques', section: 'sport' })
stadium = Category.create!({ name: 'Stade', section: 'sport' })

puts "-- Create characteristics ..."
slope = Characteristic.create!(value_type: 'more', label: 'Pente Max', key: 'maxSlope')
width = Characteristic.create!(value_type: 'less', label: 'Largeurs des passages', key: 'passageWidth')
door_step_height = Characteristic.create!(value_type: 'more', label: 'Hauteur Seuil', key: 'stepHeight')
table_height = Characteristic.create!(value_type: 'less', label: 'Hauteur Max table', key: 'tableHeight')
hand_height = Characteristic.create!(value_type: 'more', label: 'Hauteur maximum atteignable avec la main', key: 'reachHeight')
handrail = Characteristic.create!(value_type: 'equal', label: 'Besoin d’une main courante', key: 'handrail')
bed_height = Characteristic.create!(value_type: 'more', label: 'Hauteur du lit', key: 'bedHeight')
space_near_bed = Characteristic.create!(value_type: 'less', label: 'Surface libre à côté du lit', key: 'bedAdjacentSpace')
space_near_wc = Characteristic.create!(value_type: 'less', label: 'Distance libre minimum à côté des WCs', key: 'wcAdjacentDistance')
space_front_of_wc = Characteristic.create!(value_type: 'less', label: 'Distance libre minimum devant des WCs', key: 'wcFrontDistance')
wc_height = Characteristic.create!(value_type: 'less', label: 'Hauteur maximum lunette WC', key: 'wcSeatHeight')
grab_bar = Characteristic.create!(value_type: 'equal', label: 'Besoin barre d’appui L WC', key: 'wcFixedHandrail')
folding_grab_bar = Characteristic.create!(value_type: 'equal', label: 'Besoin barre d’appui rabattable WC', key: 'wcFoldableHandrail')
eurokey = Characteristic.create!(value_type: 'equal', label: 'Clé Eurokey', key: 'eurokey')
sink_wc_space = Characteristic.create!(value_type: 'less', label: 'Distance Max entre Lavabo et WC', key: 'wcSinkDistance')
shower = Characteristic.create!(value_type: 'equal', label: 'Y a t’il une douche', key: 'hasShower')
bathtub = Characteristic.create!(value_type: 'equal', label: 'Y a t’il une baignore', key: 'hasBathtub')
lift_seat = Characteristic.create!(value_type: 'equal', label: 'Besoin d’un siège élévateur de bain', key: 'bathSeat')
shower_grab_bar = Characteristic.create!(value_type: 'equal', label: 'Besoin barre d’appui L douche', key: 'showerFixedHandrail')
shower_folding_grab_bar = Characteristic.create!(value_type: 'equal', label: 'Besoin barre d’appui rabattable douche', key: 'showerFoldableHandrail')


maxBedHeight = Characteristic.create!(value_type: 'more', label: 'Max bed height', key: 'maxBedHeight')
minBedHeight = Characteristic.create!(value_type: 'less', label: 'Min bed height', key: 'minBedHeight')
maxWcSeatHeight = Characteristic.create!(value_type: 'more', label: 'Max wc seat height', key: 'maxWcSeatHeight')
minWcSeatHeight = Characteristic.create!(value_type: 'less', label: 'Min wc seat height', key: 'minWcSeatHeight')
passageLength = Characteristic.create!(value_type: 'less', label: 'Passage length', key: 'passageLength')

"maxBedHeight", "minBedHeight", "maxWcSeatHeight", "minWcSeatHeight"

place_characteristics = {
  7764 => slope,
  7379 => slope,
  6551 => slope,
  7235 => slope,
  7492 => width,
  7494 => width,
  7496 => width,
  7461 => width,
  7765 => width,
  7490 => door_step_height,
  7460 => door_step_height,
  7233 => door_step_height,
  7763 => door_step_height,
  7521 => door_step_height,
  6604 => table_height,
  7429 => table_height,
  6541 => hand_height,
  6007 => handrail,
  6548 => handrail,
  6559 => handrail,
  5951 => handrail,
  7409 => handrail,
  6506 => handrail,
  3681 => bed_height,
  6627 => bed_height,
  6681 => bed_height,
  6626 => space_near_bed,
  6680 => space_near_bed,
  7533 => space_near_wc,
  7507 => space_near_wc,
  7532 => space_front_of_wc,
  7506 => space_front_of_wc,
  7530 => wc_height,
  7497 => wc_height,
  7541 => grab_bar,
  7508 => grab_bar,
  7509 => folding_grab_bar,
  7542 => folding_grab_bar,
  7531 => eurokey,
  7535 => sink_wc_space,
  7515 => sink_wc_space,
  7514 => shower,
  7503 => bathtub,
  7504 => bathtub,
  7505 => bathtub,
  7518 => lift_seat,
  7510 => shower_grab_bar,
  7583 => shower_grab_bar,
  7511 => shower_folding_grab_bar,
  7594 => shower_folding_grab_bar,
}

puts "-- Create Pictograms ..."

data['Pictograms'].each do |pictogram| 
  Pictogram.create!(
    id: pictogram['Id'],
    name: pictogram['NameFr'],
    link: pictogram['LinkToPictogram'],
    link_svg: pictogram['LinkToPictogramSvg'],
  )
end 


puts "-- Create places ..."
data['Pois'].each_with_index do |poi, index|
  puts "-- Place #{index}/#{data['Pois'].count}"

  case poi['Category']
  when 'Campingplatz'
    category = camping
  when 'Hotel, Pension, Bed & Breakfast'
    category = hostel
  when 'Ferienhaus oder Ferienwohnung'
    category = house
  when 'Restaurant, Café oder Bar'
    category = restaurant
  when 'Einkaufszentrum'
    category = mall
  when 'Geschäfte'
    category = commerce
  when 'Kino'
    category = cinema
  when 'Konzerthalle, Oper oder Theatersaal'
    category = concert
  when 'Museum oder Galerie'
    category = museum
  when 'Botanischer Garten'
    category = garden
  when 'Park oder Friedhof'
    category = park
  when 'Spielplatz'
    category = playground
  when 'Aussichtspunkt'
    category = pov
  when 'Zoo'
    category = zoo
  when 'Sportstadion'
    category = sport
  when 'Eisstadion'
    category = rink
  when 'Schwimmbad'
    category = pool
  when 'Bergbahnen'
    category = lifts
  when 'Sportstadion'
    category = stadium
  else
    category = nil
  end

  response = JSON.parse HTTParty.get("https://api.mapbox.com/geocoding/v5/mapbox.places/#{poi['Coordinates']['Lng']},#{poi['Coordinates']['Lat']}.json?access_token=pk.eyJ1IjoiZnJlc2NvYSIsImEiOiJja3o4amNkMDYwdzlxMnZtdWl4dDVjbWU5In0.ylBFV2HzN1Y_NWkSLQMQaA")
  next if response['features'][0].nil?
  region = ''
  response['features'][0]['context'].each do |context|
    region = context['text'] if context['id'].include?('region.')
  end
  case region.strip
  when 'Aargau', 'Baden-Württemberg', 'Solothurn'
    final_region = 'argovie'
  when 'Basel-Land', 'Basel-Stadt'
    final_region = 'bale'
  when 'Bern'
    final_region = 'berne'
  when 'Fribourg'
    final_region = 'fribourg'
  when 'Geneva'
    final_region = 'geneve'
  when 'Graubünden'
    final_region = 'grisons'
  when 'Doubs', 'Jura', 'Neuchâtel'
    final_region = 'jura'
  when 'Vaud'
    final_region = 'leman'
  when 'Bavaria', 'Vorarlberg'
    final_region = 'liechtenstein'
  when 'Lucerne', 'Nidwalden', 'Obwalden', 'Schwyz', 'Uri'
    final_region = 'lucerne'
  when 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Glarus', 'Schaffhausen', 'St. Gallen', 'Thurgau'
    final_region = 'orientale'
  when 'Ticino'
    final_region = 'tessin'
  when 'Valais'
    final_region = 'valais'
  when 'Zug', 'Zürich'
    final_region = 'zurich'
  end

  if category.present?
    Place.create!(
      category: category,
      name: poi['Name'].strip,
      zuerst_id: poi['IdZuerst'],
      region: final_region,
      pictograms: poi['PictogramIds'].present? ?  poi['PictogramIds'].map{|id| Pictogram.find(id)} : [],
      latitude: poi['Coordinates']['Lat'],
      longitude: poi['Coordinates']['Lng'],
      street: poi['Address']['Street'],
      number: poi['Address']['Number'],
      zip: poi['Address']['ZipCode'],
      city: poi['Address']['City']
    )  
  end
end
puts "-- Created all places !"

# response = HTTParty.get("https://zuerst.proinfirmis.ch/api/v1/export/GetChecklistsAndAnswers?dateFrom=1.01.17&dateTo=31.12.17", headers: {"authorization": "Bearer tzfe9Y8yqOYf2yJ9_6y-SrzOo2Xf9mwZ67KIjgIUkjn_MBJq1Eb--gmPsgqwJTsFJqiTWYOw70K9yKiXsrk28LPyalTNY-9d1-wqIlaHUC9v-nkBHntzHIeo_jhmklCNznyRG9BxmlHpSPrc9PseEGe8HTxNBVuQg0O8yrdmAQm_H9Qd-I1Q8cDp1BlxBMco_rL4nxZeeJ-WMD0Rxs7ZqErH_Tqk2-uBg_nd3hml7u4"})
# response['Pois'].each do |poi|
#   place = Place.find_by(zuerst_id: poi['IdZuerst'])
#   next if place.nil?
#   poi['Checklists'].each do |checklist|
#     checklist['Questions'].each do |question|
#       characteristic = place_characteristics[question["Id"]]
#       next if characteristic.nil?

#       place_characteristic = place.place_characteristics.find_or_create_by(characteristic: characteristic)
#       value = question["Answer"]["AnswerValue"]
#       next if value.nil?
#       if place_characteristic.nil? || place_characteristic.value.nil?
#         place_characteristic.update!(value: value)
#       else
#         if characteristic.more?
#           place_characteristic.update!(value: value) if value > place_characteristic.value
#         elsif characteristic.less?
#           place_characteristic.update!(value: value) if value < place_characteristic.value
#         else
#           place_characteristic.update!(value: value) unless value == 0.0
#         end
#       end
#     end
#   end
# end
