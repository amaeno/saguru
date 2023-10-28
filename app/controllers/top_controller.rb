class TopController < ApplicationController
    before_action :authenticate_user, {only: [:index, :update_episode]}

    # サービス紹介ページ
    def about
        p @user = User.all
        p @episode = Episode.all
        p @summary = Summary.all
    end

    # 自己分析ページ表示
    def index
    # common ======================================= 
    
    
    # episodeTable =======================================
        @episode_header =  $episode_header 

        # Episodeモデルからデータ参照
        @episode_table_data = Episode.where(user_id: session[:user_id])
        @len_episode_table_data = @episode_table_data.length

    # chronology =======================================

    # analysisTable =======================================
        @analysisTableHeader = {Q1: 0, Q2: 1}

                                        #Qustion1 Header                                  Qustion2 Header 
        @analysisTableQ_theme_list = [  ["モチベーションが上がったのはどんな時？",              "モチベーション上昇の共通要素は？"],
                                        ["モチベーションが下がったのはどんな時？",              "モチベーション低下の共通要素は？"],
                                        ["成功体験は？",                                    "どんな学びや成長があった？"],
                                        ["失敗体験は？",                                    "どんな学びや成長があった？"],
                                        ["活躍できた・居心地の良かったチームでの活動は？",        "良い環境の共通要素は？"],
                                        ["活躍できなかった・居心地の悪かったチームでの活動は？",   "悪い環境の共通要素は？"],
                                        ["年代を通して好きなこと・得意なことは？",               "好き・得意なことの共通要素は？"],
                                        ["年代を通して嫌いなこと・苦手なことは？",               "嫌い・苦手なことの共通要素は？"]]

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
        @summary_header =  $summary_header 

        # Summaryモデルからデータ参照
        @summary_table_data = Summary.where(user_id: session[:user_id])
        @len_summary_table_data = @summary_table_data.length

    end

    # Episodeモデル更新
    def update_episode
        result = Episode.save_episode_change(params, session[:user_id])

        if result
            # 保存成功時
            if result.failed_instances.blank?
                flash[:notice] = "更新内容を保存しました"
                redirect_to("/")
            else
                p "importできませんでした"
                p result.failed_instances.first.errors
                flash[:alert] = "保存に失敗しました。入力内容を確認して再度保存してください"
                redirect_to("/")
            end
        else
            p "不適切な引数です"
            flash[:alert] = "サーバ内部エラーが発生しました"
            redirect_to("/")
        end
    end


    # Summaryモデル更新
    def update_summary
        result = Summary.save_summary_change(params, session[:user_id])

        if result
            # 保存成功時
            if result.failed_instances.blank?
                flash[:notice] = "更新内容を保存しました"
                redirect_to("/")
            else
                p "importできませんでした"
                p result.failed_instances.first.errors
                flash[:alert] = "保存に失敗しました。入力内容を確認して再度保存してください"
                redirect_to("/")
            end
        else
            p "不適切な引数です"
            flash[:alert] = "サーバ内部エラーが発生しました"
            redirect_to("/")
        end
    end

end
