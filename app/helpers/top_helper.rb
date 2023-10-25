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
    # テーブルセルのnameから属性を取得するための定数
    $EP_TAB_NAME = 0.freeze
    $EP_ROW = 1.freeze
    $EP_COL = 2.freeze

    $episodeTable_cell_is_input_tag = false
    
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

        cell_name = "episode_r_#{row_num}_c_#{sym}"
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
            cell_id = "chronology_r_#{row_num}_c_#{cell_attr}"
        elsif cell_attr == "episode"
            cell_id = "chronology_r_#{row_num}_c_#{cell_attr}"
        else
            p "不適切な属性"
        end
    end



# analysisTable =======================================

    # ************************************************
    #   @breief:  分析記入欄の各属性値を取得する
    #   @param[1]: ヘッダー番号
    #   @param[2]: Question番号
    #   @param[3]: 行番号
    #   @param[4]: 列番号
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_analysisTable_cell_attribute(header_num, question_num, row_num, col_num)
        cell_id = "analysis_G#{header_num}#{question_num}row#{row_num}col#{col_num}"
        cell_row = $TEXTAREA_ROW
        cell_placeholder = $TEXTAREA_PLACEHOLDER

        return {attr_id: cell_id,
                attr_row: cell_row,
                attr_placeholder: cell_placeholder}
    end



# summaryTable =======================================

    # ************************************************
    #   @breief:  まとめ記入欄の各属性値を取得する
    #   @param[1]: ヘッダー番号
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_summaryTable_cell_attribute(header_num)
        cell_id = "summary_G#{header_num}row0col0"
        cell_row = $TEXTAREA_ROW
        cell_placeholder = $TEXTAREA_PLACEHOLDER

        return {attr_id: cell_id, 
                attr_row: cell_row,
                attr_placeholder: cell_placeholder}
    end
end
