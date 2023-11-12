class AnalysisQ2 < ApplicationRecord
    # アソシエーション
    belongs_to :user

    # バリデーション
    validates :row, 
            numericality: { only_integer: true, in: 0...30 }

    # メソッド

    # ************************************************
    #   @breief:  AnalysisQ2モデルへ指定したブロック分の初期値分析Q2を追加
    #   @param[1]: ユーザID
    #   @return: OK or NG
    # ************************************************
    def self.made_new_analysis_q2_records?(id)
        analysis_q2 = []

        $GROUP_NUM.times do |group_cnt|
            $ANALYSIS_DEFAULT_ROW_NUM.times do |row_cnt|
                analysis_q2 << AnalysisQ2.new(
                                                user_id: id,
                                                group: group_cnt.to_i,
                                                row: row_cnt.to_i,
                                                similarity: ""
                                            )
            end
        end

        # レコードをひとまとめに追加
        result = AnalysisQ2.import analysis_q2

        # import成功時
        if result.failed_instances.blank?
            return true
        else
            p importできませんでした
            p result.failed_instances
            return false
        end
    end


    # ************************************************
    #   @breief:  分析Q2記入欄の変更をAnalysisQ2モデルへ保存
    #   @param[1]: formから受け取ったparams
    #   @param[2]: ユーザID
    #   @return: OK or NG (import時のバリデーションチェック)
    # ************************************************
    def self.save_analysis_q2_change(params, user_id)
        if params.blank? or user_id.blank?
            return false
        end
        col_cnt = 0
        row_data = {}
        update_analysis_q1 = []

        params.each do |k, v|
            # セルの属性を抽出 [テーブル名, 行数, 列名]
            cell_attr = k.split(/_g_|_q2_r_|_c_/)

            p cell_attr

            group_num = cell_attr[$ATTR_GROUP].to_i
            row_num = cell_attr[$ATTR_ROW].to_i
            col_sym = cell_attr[$ATTR_COL].to_sym

            # 各列の値を行ごとにハッシュにまとめる
            row_data.store(:group, group_num)
            row_data.store(:row, row_num)
            case col_sym
                when :similarity
                    row_data.store(:similarity, v.to_s)
                else
                    p "不適切な列項目"
                    # return false
            end

            col_cnt += 1

            # 1行全て取得したらレコード変更
            if col_cnt == $analysis_q2_header.length
                original_row = AnalysisQ2.find_by(
                                                user_id: user_id,
                                                group: row_data[:group],
                                                row: row_data[:row],
                                            )

                # 更新前後でidが共通のものは更新・存在しない場合は追加
                update_analysis_q1 << AnalysisQ2.new(
                                                id:         original_row.id,
                                                user_id:    user_id,
                                                group:      row_data[:group],
                                                row:        row_data[:row],
                                                similarity:    row_data[:similarity],
                                            )
                # 列カウントを初期化し次の行でカウント開始
                col_cnt = 0
                row_data = {}
            end
        end

        # レコードをひとまとめに追加
        result = AnalysisQ2.import update_analysis_q1, on_duplicate_key_update: [
                                                                            :group,
                                                                            :row,
                                                                            :similarity,
                                                                        ]
    end
end
