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

        @episodeTable_row_nums.times do |row_num|
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
        cell_class = "episodeTable__column"
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


    # ************************************************
    #   @breief:  エピソード欄に記入されたデータの指定列の要素を取得する
    #   @param[1]: エピソード欄の列名シンボル
    #   @return: エピソード欄の指定列データ配列
    # ************************************************
    def get_episodeTable_column_data(col_name)
        col_data_array = []
        col_num = @episode_header_list.length
        len_episodeTable_data = @episodeTable_cell_data.length - 1

        if (@episode_header_index[:age]..@episode_header_index[:note]).include?(@episode_header_index[col_name])
            # 一列目の指定セルから行数個おきに要素を取り出す
            @episode_header_index[col_name].step(len_episodeTable_data, col_num){ |cell_data| col_data_array.push(@episodeTable_cell_data[cell_data]) }
        else
            p "不適切な引数"
        end
        
        return col_data_array
    end


# chronology =======================================

    # ************************************************
    #   @breief:  チャート欄のidを取得する
    #   @param[1]: 行番号
    #   @param[2]: セル属性(:age or :episode)
    #   @return: セルのid
    # ************************************************
    def get_chronology_cell_id(row_num, cell_attr)
        if cell_attr == :age
            cell_id = "chronology_row#{row_num}col#{@episode_header_index[:age]}"
        elsif cell_attr == :episode
            cell_id = "chronology_row#{row_num}col#{@episode_header_index[:episode]}"
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
        cell_row = @textarea_row
        cell_placeholder = @textarea_placeholder

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
        cell_row = @textarea_row
        cell_placeholder = @textarea_placeholder

        return {attr_id: cell_id, 
                attr_row: cell_row,
                attr_placeholder: cell_placeholder}
    end
end
