class TopController < ApplicationController
    def index
        # common =======================================
    
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
        @episode_header_index = {   age: 0,
                                    episode: 1,
                                    emotion: 2,
                                    motivation: 3,
                                    note: 4}

        @episode_header_list = ["年齢",
                                "エピソード",
                                "当時の感情・思考",
                                "モチベーション",
                                "振り返って気づいたこと"]
    
        # エピソード欄に記入したデータを保持する列数*行数の1次元配列
        @episodeTable_cell_data = []

        episodeTable_default_row_nums = 19
        @episodeTable_row_nums = episodeTable_default_row_nums

        @option_colAge = "-numItemAge"
        @option_colMotivation = "-numItemMotivation"


        # chronology =======================================


    
    
        # analysisTable =======================================
        @analysisTableHeader = {Q1: 0, Q2: 1}

                                        #Qustion1 Header                                  Qustion2 Header 
        @analysisTableQ_theme_list = [  ["モチベーションが上がったのはどんな時？",              "モチベーションが上がる時の共通要素は？"],
                                        ["モチベーションが下がったのはどんな時？",              "モチベーションが下がる時の共通要素は？"],
                                        ["成功体験は？",                                    "どんな学びや成長があった？"],
                                        ["失敗体験は？",                                    "どんな学びや成長があった？"],
                                        ["活躍できた・居心地の良かったチームでの活動は？",        "活躍できる・居心地の良い環境の共通要素は？"],
                                        ["活躍できなかった・居心地の悪かったチームでの活動は？",   "活躍できない・居心地の悪い環境の共通要素は？"],
                                        ["年代を通して好きなこと・得意なことは？",               "得意なことの共通要素は？"],
                                        ["年代を通して嫌いなこと・苦手なことは？",               "嫌いなこと・苦手なことの共通要素は？"]]

        @analysisTableQ1_header_list = [["エピソード", "理由"],
                                        ["エピソード", "理由"],
                                        ["エピソード", "要因"],
                                        ["エピソード", "要因"],
                                        ["エピソード", "理由"],
                                        ["エピソード", "理由"],
                                        ["好きなこと・得意なこと", "理由"],
                                        ["嫌いなこと・苦手なこと", "理由"]]

        @analysisTableQ2_header_list = [["共通要素"],
                                        ["共通要素"],
                                        ["学び・成長"],
                                        ["学び・成長"],
                                        ["共通要素"],
                                        ["共通要素"],
                                        ["共通要素"],
                                        ["共通要素"]]

        analysisTable_default_row_nums = 2
        @analysisTable_row_nums = analysisTable_default_row_nums

    
        # summaryTable =======================================
        @summary_header_list = ["価値観・大切にしている考え",
                                "やりたいこと",
                                "活躍できる環境",
                                "目指す姿"] 

    end
end
