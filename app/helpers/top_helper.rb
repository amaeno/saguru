module TopHelper
# common =======================================
    # フォームの属性初期値
    $TEXTAREA_ROW = 2.freeze
    $TEXTAREA_PLACEHOLDER = "ここに入力".freeze

    $INPUT_MIN_AGE = 0.freeze
    $INPUT_MAX_AGE = 100.freeze

    $INPUT_MIN_MOTIVATION = 0.freeze
    $INPUT_MAX_MOTIVATION = 100.freeze
    $INPUT_PLACEHOLDER_MOTIVATION = "50".freeze

    # テーブルセルのnameから属性を取得するための定数
    $ATTR_TAB_NAME = 0.freeze
    $ATTR_GROUP = 1.freeze
    $ATTR_ROW = 2.freeze
    $ATTR_COL = 3.freeze


    # ************************************************
    #   @breief:  param[1]にparam[2]のクラスを全て追加する
    #   @param[1]: オリジナルのクラス
    #   @param[2]: 追加したいクラスの配列
    #   @return: 全てのクラスが結合された文字列
    # ************************************************
    def add_class(original_class, add_class_list)
        add_class_list.sum(original_class){|add_class| " #{add_class}"}
    end


# episodeTable =======================================
    # 新規登録時に作成作成する年齢の範囲
    $START_AGE = 6
    $END_AGE = 24

    $episodeTable_cell_is_input_tag = false

                            # DB参照用ハッシュ # headerテキスト 
    $episode_header =  {
                                age:        "年齢",
                                episode:    "エピソード",
                                emotion:    "当時の感情・思考",
                                motivation: "モチベーション",
                                awareness:  "振り返って気づいたこと",
                            }.freeze

    $len_episode_header = $episode_header.length
    
    # ************************************************
    #   @breief:  エピソード記入欄の各属性値を取得する
    #   @param[1]: エピソードモデルのレコード配列
    #   @param[2]: エピソードモデルのシンボル
    #   @param[3]: エピソードモデルのカラム情報
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_episodeTable_cell_attribute(record, sym, column)
        if record.blank?
            p 無効のレコードです
            return false
        end
        if sym.blank?
            p 無効のシンボルです
            return false
        end
        if column.blank?
            p 無効のカラム情報です
            return false
        end

        row_num = record.row

        cell_name = "episode_g_0_r_#{row_num}_c_#{sym}"
        cell_class = "episodeTable__column"

        option_colAge = "-numItemAge"
        option_colMotivation = "-numItemMotivation"

        # フォームタグ属性初期化
        cell_type = ""
        cell_min = 0
        cell_max = 100
        cell_row = 2
        cell_placeholder = ""
        $episodeTable_cell_is_input_tag = false

        case column
            when "年齢"
                cell_class = add_class(cell_class, [option_colAge])
                cell_type = "number"
                cell_min = $INPUT_MIN_AGE
                cell_max =  $INPUT_MAX_AGE
                # placeholderは年齢値を設定
                cell_placeholder = record.age.to_s

                # 子要素をinputタグに設定するためのフラグ
                $episodeTable_cell_is_input_tag = true

            when "モチベーション"
                cell_class = add_class(cell_class, [option_colMotivation])
                cell_type = "number"
                cell_min = $INPUT_MIN_MOTIVATION
                cell_max =  $INPUT_MAX_MOTIVATION
                cell_placeholder = $INPUT_PLACEHOLDER_MOTIVATION

                # 子要素をinputタグに設定するためのフラグ
                $episodeTable_cell_is_input_tag = true

            else
                # クラスの追加はしない
                cell_row = $TEXTAREA_ROW
                cell_placeholder = $TEXTAREA_PLACEHOLDER
        end

        return {
                    attr_name: cell_name, 
                    attr_class: cell_class, 
                    attr_type: cell_type, 
                    attr_min: cell_min, 
                    attr_max: cell_max, 
                    attr_row: cell_row,
                    attr_placeholder: cell_placeholder
                }
    end


    # ************************************************
    #   @breief:  エピソード記入欄がinputタグかを判定する
    #   @param[1]: -
    #   @return: true or false
    # ************************************************
    def episodeTable_cell_is_input_tag?
        return $episodeTable_cell_is_input_tag
    end


# chronology =======================================

    # ************************************************
    #   @breief:  チャート欄のidを取得する
    #   @param[1]: 行番号
    #   @param[2]: セル属性("age" or "episode")
    #   @return: セルのid
    # ************************************************
    def get_chronology_cell_id(row_num, cell_attr)
        if cell_attr == "age"
            cell_id = "chronology_g_0_r_#{row_num}_c_#{cell_attr}"
        elsif cell_attr == "episode"
            cell_id = "chronology_g_0_r_#{row_num}_c_#{cell_attr}"
        else
            p "不適切な属性"
        end
    end



# analysisTable =======================================
    $analysis_q1_header =  {
                                example: 0,
                                reason: 1,
                            }.freeze

    $analysis_q2_header =  {
                                similarity: 0,
                            }.freeze
                                        # theme                                                     # hedaer_column
    $analysisTableQ1_content_list = [
                                        ["モチベーションが上がったのはどんな時？",                  ["エピソード",               "理由"]],
                                        ["モチベーションが下がったのはどんな時？",                  ["エピソード",               "理由"]],
                                        ["成功体験は？",                                            ["エピソード",               "要因"]],
                                        ["失敗体験は？",                                            ["エピソード",               "要因"]],
                                        ["活躍できた・居心地の良かったチームでの活動は？",          ["エピソード",               "理由"]],
                                        ["活躍できなかった・居心地の悪かったチームでの活動は？",    ["エピソード",               "理由"]],
                                        ["年代を通して好きなこと・得意なことは？",                  ["好きなこと・得意なこと",   "理由"]],
                                        ["年代を通して嫌いなこと・苦手なことは？",                  ["嫌いなこと・苦手なこと",   "理由"]],
                                    ].freeze
                                        # theme                                 # hedaer_column
    $analysisTableQ2_content_list = [
                                        ["モチベーション上昇の共通要素は？",    ["共通要素"]],
                                        ["モチベーション低下の共通要素は？",    ["共通要素"]],
                                        ["どんな学びや成長があった？",          ["学び・成長"]],
                                        ["どんな学びや成長があった？",          ["学び・成長"]],
                                        ["良い環境の共通要素は？",              ["共通要素"]],
                                        ["悪い環境の共通要素は？",              ["共通要素"]],
                                        ["好き・得意なことの共通要素は？",      ["共通要素"]],
                                        ["嫌い・苦手なことの共通要素は？",      ["共通要素"]],
                                    ].freeze

    # 新規登録時に作成作成するグループの数
    $GROUP_NUM = $analysisTableQ1_content_list.length
    $ANALYSIS_DEFAULT_ROW_NUM = 2.freeze

    # 分析テーブルを参照するための定数
    $ANALYSIS_THEME = 0.freeze
    $ANALYSIS_HEADER = 1.freeze

    # ************************************************
    #   @breief:  分析記入欄のグループごとの値を取得する
    #   @param[1]: Question番号 (Q1 or Q2)
    #   @param[2]: グループ番号
    #   @return: グループごとの値を格納したハッシュ
    # ************************************************
    def get_analysisTable_group_data(question_num, group_num)
        if question_num == :q1
            AnalysisQ1.where(user_id: session[:user_id], group: group_num.to_i)
        elsif question_num == :q2
            AnalysisQ2.where(user_id: session[:user_id], group: group_num.to_i)
        else
            p "不正な値です"
            return false
        end
    end

    # ************************************************
    #   @breief:  分析記入欄の各属性値を取得する
    #   @param[1]: グループ番号
    #   @param[2]: Question番号
    #   @param[3]: 行番号
    #   @param[4]: 列番号
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_analysisTable_cell_attribute(group_num, question_num, record, k_sym)
        if (question_num == :q1) || (question_num == :q2)
        cell_name = "analysis_g_#{group_num}_#{question_num}_r_#{record.row}_c_#{k_sym}"
        cell_row = $TEXTAREA_ROW
        cell_placeholder = $TEXTAREA_PLACEHOLDER

        return {
                    attr_name: cell_name,
                    attr_row: cell_row,
                    attr_placeholder: cell_placeholder
                }
        else
            p "不正な値です"
            return false
        end
    end



# summaryTable =======================================
    $summary_header =  {
                            value:          "価値観・大切にしている考え",
                            try:            "やりたいこと",
                            environment:    "活躍できる環境",
                            vision:         "目指す姿",
                        }.freeze

    # ************************************************
    #   @breief:  まとめ記入欄の各属性値を取得する
    #   @param[1]: ヘッダーキー
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_summaryTable_cell_attribute(header_key)
        cell_name = "summary_g_0_r_0_c_#{header_key}"
        cell_row = $TEXTAREA_ROW
        cell_placeholder = $TEXTAREA_PLACEHOLDER

        return {
                    attr_name: cell_name, 
                    attr_row: cell_row,
                    attr_placeholder: cell_placeholder
                }
    end
end
