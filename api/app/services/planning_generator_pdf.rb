require 'prawn/measurement_extensions'

# Generate PDF from planning
class PlanningGeneratorPdf
  include ActionView::Helpers::NumberHelper

  GREY_COLOR = '292c2f'
  DAY_WIDTH = 50.mm
  SPACE_BEFORE_DAY = 21.mm

  def initialize
    @pdf = Prawn::Document.new(page_size: 'A4', page_layout: :landscape, margin: [0,0,0,0])
    @pdf.font_families.update('Arial' => {
                                normal: Rails.root.join('app/assets/fonts/Arial-Regular.ttf'),
                                bold: Rails.root.join('app/assets/fonts/Arial-Bold.ttf'),
                              })

    @pdf.font 'Arial'
  end

  def generate(planning)
    planning = JSON.parse(planning["planning"])

    @pdf.canvas do
      planning["schedule"].each_with_index do |day, index|
        if index % 4 == 0
          @pdf.start_new_page(margin: [0,0,0,0]) unless index == 0
          @height = 210.mm
          @width = 9.mm
          write_header(planning)
        end

        @height = 170.mm
        write_day(day)
        @width += SPACE_BEFORE_DAY + DAY_WIDTH
      end
      
    end

    path = "public/planning/#{SecureRandom.uuid}.pdf"
    @pdf.render_file path
    path
  end

  # Write header and cover page
  def write_header(planning)
    img = File.open('./app/assets/images/coverpage.png')
    @pdf.image(img, at: [0, 210.mm], width: 297.mm, height: 210.mm)

    start_date = Date.parse(planning["schedule"][0]["date"]).strftime("%d.%m.%Y")
    end_date = Date.parse(planning["schedule"][-1]["date"]).strftime("%d.%m.%Y")

    options = { size: 14, color: GREY_COLOR, character_spacing: -0.025 }
    @pdf.bounding_box([0, @height - 12.mm], width: 297.mm) do
      @pdf.text(I18n.t('planning_pdf.title', start_date: start_date, end_date: end_date), options.merge(align: :center, inline_format: true, style: :bold))
    end

    accommodation = Place.find(planning["accommodation"]["id"])
    options = { size: 9, color: GREY_COLOR, character_spacing: -0.025 }
    @pdf.bounding_box([48.mm, @height - 27.mm], width: 200.mm) do
      @pdf.text("<b>#{accommodation.name}</b>    -    #{accommodation.full_address}", options.merge(inline_format: true))
    end
  end

  # Write a day column
  def write_day(day)
    options = { size: 12, color: GREY_COLOR, character_spacing: -0.025, style: :bold }
    @pdf.bounding_box([@width + 6.mm, @height], width: DAY_WIDTH) do
      @pdf.text(Date.parse(day["date"]).strftime("%d.%m.%Y"), options.merge(align: :center, inline_format: true))
    end

    @height -= 8.mm
    day["activities"].each do |activity|
      write_activity(activity)
    end
  end

  # Write activity card 
  def write_activity(activity)
    activity = Place.find(activity["id"])
    image_path = activity.category.restaurant? ? 'restaurant_card.png' : 'activity_card.png'
    img = File.open("./app/assets/images/#{image_path}")
    @pdf.image(img, at: [@width, @height], width: 65.mm, height: 20.mm)

    options = { size: 8, color: GREY_COLOR, character_spacing: -0.025 }
    @pdf.bounding_box([@width + 2.mm, @height - 8.mm], width: DAY_WIDTH) do
      @pdf.text(activity.name.to_s, options.merge(inline_format: true, style: :bold))
      @pdf.text(activity.full_address.to_s, options.merge(inline_format: true))
    end

    @height -= 23.mm
  end
end
