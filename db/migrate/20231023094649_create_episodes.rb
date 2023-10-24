class CreateEpisodes < ActiveRecord::Migration[7.0]
  def change
    create_table :episodes do |t|
      t.integer :row
      t.string :user_id
      t.integer :age
      t.string :episode
      t.string :emotion
      t.integer :motivation
      t.string :awareness

      t.timestamps
    end
  end
end
