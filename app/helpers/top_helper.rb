module TopHelper
# common =======================================

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
    $episodeTable_cell_is_input_tag = false

    # ************************************************
    #   @breief:  エピソード記入欄のデータを格納する配列を作成する
    #   @param[1]: -
    #   @return: 初期化された列数*行数のデータ配列
    # ************************************************
    def init_episodeTable_cell_data()
        # ２次元テーブルのデータを 列数*行数 の１次元配列で管理する
        data_array = []
        start_age = 6
        default_motivation = 50

        @episodeTable_default_row_nums.times do |row_num|
            @episode_header_list.each do |header_col|
                case header_col
                    when "年齢"
                        data_array.push(start_age)
                    when "エピソード"
                        data_array.push("")
                    when "当時の感情・思考"
                        data_array.push("")
                    when "モチベーション"
                        data_array.push(default_motivation)
                    when "振り返って気づいたこと"
                        data_array.push("")
                    else
                        p "不適切なヘッダー値"
                end
            end
            start_age += 1
        end

        return data_array
    end
    
    # ************************************************
    #   @breief:  エピソード記入欄の各属性値を取得する
    #   @param[1]: セルの行番号
    #   @param[2]: セルの列番号
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_episodeTable_cell_attribute(row_num, col_num)
        cell_id = "episode_row#{row_num}col#{col_num}"
        cell_class = @episodeTable_column
        cell_type = ""
        cell_min = 0
        cell_max = 100
        cell_row = 2
        cell_placeholder = ""
        $episodeTable_cell_is_input_tag = false

        case @episode_header_list[col_num]
            when "年齢"
                cell_class = add_class(cell_class, [@option_colAge])
                cell_type = "number"
                cell_min = @input_min_age
                cell_max =  @input_max_age
                cell_placeholder = @input_placeholder_age

                # 子要素をinputタグに設定するためのフラグ
                $episodeTable_cell_is_input_tag = true

            when "モチベーション"
                cell_class = add_class(cell_class, [@option_colMotivation])
                cell_type = "number"
                cell_min = @input_min_motivation
                cell_max =  @input_max_motivation
                cell_placeholder = @input_placeholder_motivation

                # 子要素をinputタグに設定するためのフラグ
                $episodeTable_cell_is_input_tag = true

            else
                # クラスの追加はしない
                cell_row = @textarea_row
                cell_placeholder = @textarea_placeholder
        end

        return {attr_id: cell_id, 
                attr_class: cell_class, 
                attr_type: cell_type, 
                attr_min: cell_min, 
                attr_max: cell_max, 
                attr_row: cell_row,
                attr_placeholder: cell_placeholder}
    end


    # ************************************************
    #   @breief:  エピソード記入欄がinputタグかを判定する
    #   @param[1]: -
    #   @return: true or false
    # ************************************************
    def episodeTable_cell_is_input_tag?
        return $episodeTable_cell_is_input_tag
    end



# analysisTable =======================================




# summaryTable =======================================

    # ************************************************
    #   @breief:  まとめ記入欄の各属性値を取得する
    #   @param[1]: ヘッダー番号
    #   @return: 各属性値を含んだハッシュ
    # ************************************************
    def get_summaryTable_cell_attribute(header_num)
        cell_id = "summary_G#{header_num}row0col0"
        cell_class = @summaryTable_column
        cell_row = @textarea_row
        cell_placeholder = @textarea_placeholder

        return {attr_id: cell_id, 
                attr_class: cell_class, 
                attr_row: cell_row,
                attr_placeholder: cell_placeholder}
    end
end
