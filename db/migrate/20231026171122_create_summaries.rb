class CreateSummaries < ActiveRecord::Migration[7.0]
  def change
    create_table :summaries do |t|
      t.string :user_id
      t.string :value
      t.string :try
      t.string :environment
      t.string :vision

      t.timestamps
    end
  end
end
