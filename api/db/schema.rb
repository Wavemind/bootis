# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_15_134448) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.integer "section"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characteristics", force: :cascade do |t|
    t.string "label"
    t.integer "value_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "key"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string "label"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cuisines_places", id: false, force: :cascade do |t|
    t.bigint "cuisine_id", null: false
    t.bigint "place_id", null: false
  end

  create_table "pictograms", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.string "link_svg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pictograms_places", id: false, force: :cascade do |t|
    t.bigint "pictogram_id", null: false
    t.bigint "place_id", null: false
  end

  create_table "place_characteristics", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.bigint "characteristic_id", null: false
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["characteristic_id"], name: "index_place_characteristics_on_characteristic_id"
    t.index ["place_id"], name: "index_place_characteristics_on_place_id"
  end

  create_table "places", force: :cascade do |t|
    t.string "name"
    t.integer "zuerst_id"
    t.integer "region"
    t.float "latitude"
    t.float "longitude"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "street"
    t.string "number"
    t.string "zip"
    t.string "city"
    t.integer "trip_advisor_id"
    t.string "picture_url"
    t.index ["category_id"], name: "index_places_on_category_id"
  end

  create_table "user_characteristics", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "characteristic_id", null: false
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["characteristic_id"], name: "index_user_characteristics_on_characteristic_id"
    t.index ["user_id"], name: "index_user_characteristics_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "place_characteristics", "characteristics"
  add_foreign_key "place_characteristics", "places"
  add_foreign_key "places", "categories"
  add_foreign_key "user_characteristics", "characteristics"
  add_foreign_key "user_characteristics", "users"
end
