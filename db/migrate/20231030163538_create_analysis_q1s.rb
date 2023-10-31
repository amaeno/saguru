class CreateAnalysisQ1s < ActiveRecord::Migration[7.0]
  def change
    create_table :analysis_q1s do |t|
      t.string :user_id
      t.integer :group
      t.integer :row
      t.string :example
      t.string :reason

      t.timestamps
    end
  end
end
