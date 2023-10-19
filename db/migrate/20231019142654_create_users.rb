class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    # デフォルトのID設定を無視するために id: false
    create_table :users, id: false do |t|
      # ユーザIDをUUIDで設定
      t.string :id, limit: 36, null: false, primary_key: true
      t.string :name
      t.string :password

      t.timestamps
    end
  end
end
