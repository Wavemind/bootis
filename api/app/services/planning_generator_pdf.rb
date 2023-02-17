require 'prawn/measurement_extensions'

class PlanningGeneratorPdf
  # include ApplicationHelper
  include ActionView::Helpers::NumberHelper

  GREY_COLOR = '292c2f'
  BLACK_COLOR = '000000'
  WM_BLACK_COLOR = '343434'
  WHITE_COLOR = 'FFFFFF'
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

  def write_header(planning)
    img = File.open('./app/assets/images/coverpage.png')
    @pdf.image(img, at: [0, 210.mm], width: 297.mm, height: 210.mm)

    start_date = Date.parse(planning["schedule"][0]["date"]).strftime("%d.%m.%Y")
    end_date = Date.parse(planning["schedule"][-1]["date"]).strftime("%d.%m.%Y")

    options = { size: 14, color: GREY_COLOR, character_spacing: -0.025 }
    @pdf.bounding_box([0, @height - 12.mm], width: 297.mm) do
      @pdf.text("Voici votre planning du #{start_date} au #{end_date}", options.merge(align: :center, inline_format: true, style: :bold))
    end

    accommodation = Place.find(planning["accommodation"]["id"])
    options = { size: 9, color: GREY_COLOR, character_spacing: -0.025 }
    @pdf.bounding_box([48.mm, @height - 27.mm], width: 200.mm) do
      @pdf.text("<b>#{accommodation.name}</b>    -    #{accommodation.full_address}", options.merge(inline_format: true))
    end
  end

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








  def write_title
    @pdf.fill_color GREY_COLOR
    @pdf.text_box(I18n.t('billing_pdf.title', bill_title: @bill.product.name).upcase, {
                    at: [25.mm, 260.mm],
                    size: 11,
                    style: :bold,
                    character_spacing: 1
                  })
  end

  def write_prices_table
    height = 199.5

    write_column_names(height)

    height -= 10

    @bill.invoice_lines.each do |invoice_line|
      write_bill_line(invoice_line, height)
      height -= 10
    end

    stroke_dashed_horizontal_line(25.mm, 185.mm, at: height.mm, line_length: 2.mm,
                                                 space_length: 1.mm)

    height -= 7
    options = { size: 10, color: GREY_COLOR, character_spacing: 1 }
    @pdf.bounding_box([135.mm, height.mm], width: 26.mm) do
      @pdf.text(I18n.t('billing_pdf.amount'), options.merge(align: :right, inline_format: true))
    end

    @pdf.bounding_box([161.mm, height.mm], width: 24.mm) do
      @pdf.text(format_amount(@bill.amount), options.merge(align: :right, style: :bold))
    end

    height -= 7
    @pdf.bounding_box([135.mm, height.mm], width: 26.mm) do
      @pdf.text(I18n.t('billing_pdf.tva_amount', tva: @bill.vat_rate),
                options.merge(align: :right, inline_format: true))
    end

    @pdf.bounding_box([161.mm, height.mm], width: 24.mm) do
      @pdf.text(format_amount(@bill.vat_amount), options.merge(align: :right, style: :bold))
    end

    height -= 10
    @pdf.fill_color WM_BLACK_COLOR
    @pdf.fill_rectangle([25.mm, height.mm], 164.mm, 12.mm)

    options = { size: 16, color: WHITE_COLOR, valign: :center, character_spacing: 1 }
    @pdf.bounding_box([28.mm, height.mm], width: 97.mm, height: 10.mm) do
      @pdf.text(I18n.t('billing_pdf.total_amount'), options.merge(inline_format: true))
    end
    @pdf.bounding_box([125.mm, height.mm], width: 60.mm, height: 10.mm) do
      @pdf.text(format_amount(@bill.amount_ttc), options.merge(align: :right, style: :bold))
    end

    # Write static line
    height -= 14
    @pdf.fill_color GREY_COLOR
    @pdf.text_box(I18n.t('billing_pdf.wavemind_banking'), {
                    at: [25.mm, height.mm],
                    size: 9,
                    inline_format: true
                  })
  end

  def write_column_names(height)
    options = { size: 9, color: GREY_COLOR, character_spacing: 1 }
    @pdf.bounding_box([25.mm, height.mm], width: 110.mm) do
      @pdf.text(I18n.t('billing_pdf.columns.description'), options.merge(style: :bold))
    end

    @pdf.bounding_box([135.mm, height.mm], width: 26.mm) do
      @pdf.text(I18n.t('billing_pdf.columns.quantity'), options.merge(align: :center, style: :bold))
    end

    @pdf.bounding_box([161.mm, height.mm], width: 24.mm) do
      @pdf.text(I18n.t('billing_pdf.columns.total'),
                options.merge(align: :right, inline_format: true))
    end
  end

  def write_bill_line(invoice_line, height)
    options = { size: 9, color: GREY_COLOR, style: :extralight, valign: :center,
                character_spacing: 1 }
    stroke_dashed_horizontal_line(25.mm, 185.mm, at: height.mm, line_length: 2.mm,
                                                 space_length: 1.mm)

    @pdf.bounding_box([25.mm, height.mm], width: 110.mm, height: 10.mm) do
      @pdf.text(invoice_line.wording, options)
    end

    @pdf.bounding_box([135.mm, height.mm], width: 26.mm, height: 10.mm) do
      @pdf.text('1', options.merge(align: :center))
    end

    @pdf.bounding_box([161.mm, height.mm], width: 24.mm, height: 10.mm) do
      @pdf.text(format_amount(invoice_line.amount), options.merge(align: :right))
    end
  end

  def write_addresses
    @pdf.canvas do
      options = { size: 9, color: GREY_COLOR, character_spacing: 1, leading: 4 }
      @pdf.bounding_box([25.mm, 250.mm], width: 100.mm) do
        I18n.t('billing_pdf.wavemind_fields').each do |field|
          @pdf.text(field[1], options.merge(style: :bold))
        end
      end

      options = options.merge(style: :extralight)
      @pdf.bounding_box([57.mm, 250.mm], width: 70.mm) do
        @pdf.text(@bill.reference, options)
        @pdf.text(@bill.product.client.name, options)
        @pdf.text(date_format(@bill.sending_date), options)
        @pdf.text(date_format(@bill.sending_date + @bill.payment_deadline_days.days), options)
        @pdf.text(@bill.product.employee.full_name, options)
        @pdf.text(I18n.t('billing_pdf.wavemind_values.phone'), options)
        @pdf.text(@bill.product.employee.email, options)
      end
    end

    client = @bill.product.client
    contact = client.billing_address.presence || client.mailing_address
    address = ''
    address += "#{contact.attention_of}\n" if contact.attention_of.present?
    address += "#{contact.street}\n"
    address += "#{contact.additional}\n" if contact.additional.present?
    address += "#{contact.zip_code} #{contact.city}\n#{I18n.t("countries.#{contact.country}")}"

    @pdf.text_box(client.name, {
                    at: [125.mm, 250.5.mm],
                    size: 9,
                    style: :bold_italic,
                    character_spacing: 1,
                    leading: 4
                  })
    @pdf.text_box(address, {
                    at: [125.mm, 250.5.mm - 13],
                    size: 9,
                    character_spacing: 1,
                    leading: 4
                  })
  end

  def format_amount(amount)
    number_to_currency(amount, unit: '', separator: '.', delimiter: '´', precision: 2)
  end

  # Draw dashed line
  def stroke_dashed_horizontal_line(x1, x2, options = {})
    @pdf.line_width = 0.5
    options = options.dup
    line_length = options.delete(:line_length) || 0.5.mm
    space_length = options.delete(:space_length) || line_length
    period_length = line_length + space_length
    total_length = x2 - x1

    (total_length / period_length).ceil.times do |i|
      left_bound = x1 + i * period_length
      @pdf.stroke_horizontal_line(left_bound, left_bound + line_length, options)
    end
  end
end
