class TopController < ApplicationController
    def index
        # common =======================================
    
        block_area = "Area"
        block_list = "List"

        element_item = "__item"
        element_header = "__header"
        element_row = "__row"
        element_column = "__column"
        element_input = "__input"
        element_textarea = "__textarea"
    
    
        @textarea_row = 2
        @textarea_placeholder = "ここに入力"
    
    
        @input_type = "number"
    
        @input_min_age = 0
        @input_max_age = 100
        # placeholderは年齢値を設定
        @input_placeholder_age = 0
    
        @input_min_motivation = 0
        @input_max_motivation = 100
        @input_placeholder_motivation= 50
        
    
    
        # episodeTable =======================================
        @episode_header_list = ["年齢",
                                "エピソード",
                                "当時の感情・思考",
                                "モチベーション",
                                "振り返って気づいたこと"]
    
        @episodeTable_cell_data = []
    
        @episodeTable_default_row_nums = 19
    
        @episodeTable = "episodeTable"
        @episodeTable_header = @episodeTable + element_header
        @episodeTable_column = @episodeTable + element_column
        @episodeTable_row = @episodeTable + element_row
        @episodeTable_input = @episodeTable + element_input
        @episodeTable_textarea = @episodeTable + element_textarea
    
        @option_colAge = "-numItemAge"
        @option_colMotivation = "-numItemMotivation"
    
    
        # analysisTable =======================================
    
    
    
    
        # summaryTable =======================================
        @summary_header_list = ["価値観・大切にしている考え",
                                "やりたいこと",
                                "活躍できる環境",
                                "目指す姿"] 
    
        @summaryTable = "summaryTable"
        @summaryTableArea = @summaryTable + block_area
        @summaryTableList = @summaryTable + block_list
        @summaryTableList_item = @summaryTableList + element_item
        @summaryTable_header = @summaryTable + element_header
        @summaryTable_column = @summaryTable + element_column
        @summaryTable_row = @summaryTable + element_row
        @summaryTable_textarea = @summaryTable + element_textarea
    
    end
end
