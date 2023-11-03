class Summary < ApplicationRecord
    # アソシエーション
    belongs_to :user


    # メソッド

    # ************************************************
    #   @breief:  指定したブロック分の初期値まとめ記入欄をModelへ追加
    #   @param[1]: ユーザID
    #   @return: OK or NG
    # ************************************************
    def self.make_new_summary_records?(id)
        summary = []

        summary << Summary.new(
                            user_id: id,
                            value: "",
                            try: "",
                            environment: "",
                            vision: ""
                        )

        # レコードをひとまとめに追加
        result = Summary.import summary

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
    #   @breief:  まとめ記入欄の変更をModelへ保存
    #   @param[1]: formから受け取ったparams
    #   @param[2]: ユーザID
    #   @return: OK or NG (import時のバリデーションチェック)
    # ************************************************
    def self.save_summary_change(params, user_id)
        if params.blank? or user_id.blank?
            return false
        end
        col_cnt = 0
        row_data = {}
        update_summary = []

        params.each do |k, v|
            # セルの属性を抽出 [テーブル名, 行数, 列名]
            cell_attr = k.split(/_g_|_r_|_c_/)

            row_num = cell_attr[$ATTR_ROW].to_i
            col_sym = cell_attr[$ATTR_COL].to_sym

            # 各列の値を行ごとにハッシュにまとめる
            case col_sym
                when :value
                    row_data.store(:value, v.to_s)
                when :try
                    row_data.store(:try, v.to_s)
                when :environment
                    row_data.store(:environment, v.to_s)
                when :vision
                    row_data.store(:vision, v.to_s)
                else
                    p "不適切な列項目"
                    return false
            end


                original_row = Summary.find_by(
                                                user_id: user_id,
                                            )

                # 更新前後でidが共通のものは更新・存在しない場合は追加
                update_summary << Summary.new(
                                                id:             original_row.id,
                                                user_id:        user_id,
                                                value:          row_data[:value],
                                                try:            row_data[:try],
                                                environment:    row_data[:environment],
                                                vision:         row_data[:vision],
                                            )
        end

        # レコードをひとまとめに追加
        result = Summary.import update_summary, on_duplicate_key_update: [
                                                                            :value,
                                                                            :try,
                                                                            :environment,
                                                                            :vision,
                                                                        ]
    end
end
