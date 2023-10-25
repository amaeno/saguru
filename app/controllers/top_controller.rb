class TopController < ApplicationController
    before_action :authenticate_user, {only: [:index, :update_episode]}

    # 自己分析ページ表示
    def index
        # common ======================================= 
    
    
        # episodeTable =======================================
                            # DB参照用ハッシュ # headerテキスト 
        @episode_header =  {
                                age:        "年齢",
                                episode:    "エピソード",
                                emotion:    "当時の感情・思考",
                                motivation: "モチベーション",
                                awareness:  "振り返って気づいたこと",
                            }
        
        @len_episode_header = @episode_header.length

        # Episodeモデルからデータ参照
        @episode_table_data = Episode.where(user_id: session[:user_id])
        @len_episode_table_data = @episode_table_data.length


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

    # Episodeモデル更新
    def update_episode
        col_cnt = 0
        row_data = {}
        update_episode = []

        params.each do |k, v|
            # 受け取ったparamのうち、セル情報を含むものだけを抽出
            if k.match?(/_r_\d+_c_\w+/)
                # セルの属性を抽出 [テーブル名, 行数, 列名]
                cell_attr = k.split(/_r_|_c_/)

                row_num = cell_attr[$EP_ROW].to_i
                col_sym = cell_attr[$EP_COL].to_sym

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
                        p 不適切な列項目
                        # return false
                end

                p row_data

                col_cnt += 1

                # 1行全て取得したらレコード変更
                if col_cnt == @len_episode_header 
                    update_episode << Episode.new(
                                                    row:        row_data[:row],
                                                    age:        row_data[:age],
                                                    episode:    row_data[:episode],
                                                    emotion:    row_data[:emotion],
                                                    motivation: row_data[:motivation],
                                                    awareness:  row_data[:awareness]
                                                )
                    # 列カウントを初期化し次の行でカウント開始
                    col_cnt = 0
                    row_data = {}
                end
            end
        end

        # レコードをひとまとめに追加
        result = Episode.import update_episode, on_duplicate_key_update:   [:row,
                                                                            :age,
                                                                            :episode,
                                                                            :emotion,
                                                                            :motivation,
                                                                            :awareness
                                                                            ]

        # import成功時
        if result.failed_instances.blank?
            flash[:notice] = "更新内容を保存しました"
            redirect_to("/")
            # return true
        else
            p importできませんでした
            p result.failed_instances
            # return false
            render "top/", status: :unprocessable_entity
        end
    end

end
