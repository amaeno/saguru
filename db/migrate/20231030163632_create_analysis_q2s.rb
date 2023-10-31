class CreateAnalysisQ2s < ActiveRecord::Migration[7.0]
  def change
    create_table :analysis_q2s do |t|
      t.string :user_id
      t.integer :group
      t.integer :row
      t.string :similarity

      t.timestamps
    end
  end
end
