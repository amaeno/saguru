class Episode < ApplicationRecord
    # アソシエーション
    belongs_to :user

    # バリデーション
    validates :row, 
            presence: true,
            numericality: { only_integer: true, in: 0...200 }
    validates :age,
            presence: true,
            numericality: { only_integer: true, in: 0..100 }
    validates :motivation, 
            presence: true,
            numericality: { only_integer: true, in: 0..100 }

    # メソッド

    # ************************************************
    #   @breief:  指定した年齢分の初期値エピソード記入欄をModelへ追加
    #   @param[1]: ユーザID
    #   @param[2]: 開始年齢
    #   @param[3]: 終了年齢
    #   @return: OK or NG
    # ************************************************
    def self.make_new_episode_records(id, start_age, end_age)
        # 引数が正しい時処理を実行
        if(start_age.to_i < end_age.to_i)
            episode = []

            (start_age..end_age).each do |age_cnt|
                episode << Episode.new(
                                    row: (age_cnt - start_age),
                                    user_id: id,
                                    age: age_cnt,
                                    episode: "",
                                    emotion: "",
                                    motivation: 50,
                                    awareness: ""
                                )
            end
    
            # レコードをひとまとめに追加
            result = Episode.import episode

            # import成功時
            if result.failed_instances.blank?
                return true
            else
                p importできませんでした
                p result.failed_instances
                return false
            end
            
        else
            p 範囲指定が正しくありません
            return false
        end
    end
end
