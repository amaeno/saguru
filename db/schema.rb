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

ActiveRecord::Schema[7.0].define(version: 2023_10_30_163632) do
  create_table "analysis_q1s", force: :cascade do |t|
    t.string "user_id"
    t.integer "group"
    t.integer "row"
    t.string "example"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "analysis_q2s", force: :cascade do |t|
    t.string "user_id"
    t.integer "group"
    t.integer "row"
    t.string "similarity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "episodes", force: :cascade do |t|
    t.integer "row"
    t.string "user_id"
    t.integer "age"
    t.string "episode"
    t.string "emotion"
    t.integer "motivation"
    t.string "awareness"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "summaries", force: :cascade do |t|
    t.string "user_id"
    t.string "value"
    t.string "try"
    t.string "environment"
    t.string "vision"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: { type: :string, limit: 36 }, force: :cascade do |t|
    t.string "name"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
