class TopController < ApplicationController
    before_action :authenticate_user, {only: 
                                            [   :saguru, 
                                                :update,
                                            ]
                                        }

    # サービス紹介ページ =======================================
    def index
    end

    # 自己分析ページ表示 =======================================
    def saguru
        # episodeTable -----------------------------------------
        @episode_table_data = Episode.where(user_id: session[:user_id])
        @len_episode_table_data = @episode_table_data.length

        # chronology -----------------------------------------

        # analysisTable -----------------------------------------
        
        # summaryTable -----------------------------------------
        @summary_table_data = Summary.where(user_id: session[:user_id])
        @len_summary_table_data = @summary_table_data.length

    end


    # 全モデル更新 =======================================
    def update

        table_data_episode = {}
        table_data_analysis_q1 = {}
        table_data_analysis_q2 = {}
        table_data_summary = {}

        # 各テーブルごとにparamsを振り分け
        params.each do |k, v|
            # 受け取ったparamのうち、セル情報を含むものだけを抽出
            if k.match?(/_r_\d+_c_\w+/)
                # セルの属性を抽出 [テーブル名, グループ番号, 行数, 列名]
                cell_attr = k.split(/_g_|_r_|_c_/)

                table_name = cell_attr[$ATTR_TAB_NAME]
                group_name = cell_attr[$ATTR_GROUP]

                case table_name
                    when "episode"
                        table_data_episode.store(k, v)
                    when "analysis"
                        if group_name.include?("q1")
                            table_data_analysis_q1.store(k, v)
                        elsif group_name.include?("q2")
                            table_data_analysis_q2.store(k, v)
                        else
                            p "不適切なQuestion番号"
                        end
                    when "summary"
                        table_data_summary.store(k, v)
                    else
                        p "不適切なテーブル名"
                end
            end
        end

        # 各テーブルのDB更新
        results = []
        results.push(Episode.save_episode_change(table_data_episode, session[:user_id]))
        results.push(AnalysisQ1.save_analysis_q1_change(table_data_analysis_q1, session[:user_id]))
        results.push(AnalysisQ2.save_analysis_q2_change(table_data_analysis_q2, session[:user_id]))
        results.push(Summary.save_summary_change(table_data_summary, session[:user_id]))
        check_db_saved(results)
    end


    #  メソッド=======================================

    # ************************************************
    #   @breief:  DB保存時の成否判定をする
    #   @param[1]: DB保存結果
    #   @return: -
    # ************************************************
    def check_db_saved(saved_results)
        if saved_results.present?
            saved_results.each do |result|
                # 保存失敗時
                if result.failed_instances.present?
                    p "importできませんでした"
                    p result.failed_instances.first.errors
                    flash[:alert] = "保存に失敗しました。入力内容を確認して再度保存してください"
                    redirect_to("/saguru")
                end
            end
            # 保存成功時
            flash[:notice] = "更新内容を保存しました"
            redirect_to("/saguru")
        else
            p "不適切な引数です"
            flash[:alert] = "サーバ内部エラーが発生しました"
            redirect_to("/saguru")
        end
    end

end
