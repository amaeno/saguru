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
    #   @breief:  Episodeモデルへ指定した年齢分の初期値エピソードを追加
    #   @param[1]: ユーザID
    #   @param[2]: 開始年齢
    #   @param[3]: 終了年齢
    #   @return: OK or NG
    # ************************************************
    def self.made_new_episode_records?(id, start_age, end_age)
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


    # ************************************************
    #   @breief:  エピソード記入欄の変更をEpisodeモデルへ保存
    #   @param[1]: formから受け取ったparams
    #   @param[2]: ユーザID
    #   @return: OK or NG (import時のバリデーションチェック)
    # ************************************************
    def self.save_episode_change(params, user_id)
        if params.blank? or user_id.blank?
            return false
        end
        row_num = 0
        col_cnt = 0
        row_data = {}
        update_episode = []

        params.each do |k, v|
            # セルの属性を抽出 [テーブル名, 行数, 列名]
            cell_attr = k.split(/_g_|_r_|_c_/)

            row_num = cell_attr[$ATTR_ROW].to_i
            col_sym = cell_attr[$ATTR_COL].to_sym

            # 各列の値を行ごとにハッシュにまとめる
            row_data.store(:row, row_num)
            case col_sym
                when :age
                    row_data.store(:age, v.to_i)
                when :episode
                    row_data.store(:episode, v.to_s)
                when :emotion
                    row_data.store(:emotion, v.to_s)
                when :motivation
                    row_data.store(:motivation, v.to_i)
                when :awareness
                    row_data.store(:awareness, v.to_s)
                else
                    p "不適切な列項目"
                    # return false
            end

            col_cnt += 1

            # 1行全て取得したらレコード変更
            if col_cnt == $len_episode_header
                original_row = Episode.find_by(
                                                user_id: user_id,
                                                row: row_data[:row]
                                            )
                if original_row
                    # 更新前後でidが共通のものを更新
                    update_episode << Episode.new(
                                                    id:         original_row.id,
                                                    user_id:    user_id,
                                                    row:        row_data[:row],
                                                    age:        row_data[:age],
                                                    episode:    row_data[:episode],
                                                    emotion:    row_data[:emotion],
                                                    motivation: row_data[:motivation],
                                                    awareness:  row_data[:awareness]
                                                )
                elsif
                    # 更新前後でidが共通のものでない場合は追加
                    update_episode << Episode.new(
                                                    user_id:    user_id,
                                                    row:        row_data[:row],
                                                    age:        row_data[:age],
                                                    episode:    row_data[:episode],
                                                    emotion:    row_data[:emotion],
                                                    motivation: row_data[:motivation],
                                                    awareness:  row_data[:awareness]
                                                )
                end
                # 列カウントを初期化し次の行でカウント開始
                col_cnt = 0
                row_data = {}
            end
        end

        # 既存DBの列数を取得
        row_max = Episode.maximum("row")

        # エピソード記入欄から削除された既存レコードのデータを削除
        # row_num (変更を加える最終行)が既存レコードに含まれている場合のみ実行
        if row_num < row_max
            Episode.where(row: (row_num+1)..).destroy_all
        end

        # レコードをひとまとめに追加
        result = Episode.import update_episode, on_duplicate_key_update: [
                                                                            :row,
                                                                            :age,
                                                                            :episode,
                                                                            :emotion,
                                                                            :motivation,
                                                                            :awareness
                                                                        ]                                                               
    end
end
