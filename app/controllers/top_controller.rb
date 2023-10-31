class TopController < ApplicationController
    before_action :authenticate_user, {only: 
                                            [   :saguru, 
                                                :update_episode, 
                                                :update_analysis, 
                                                :update_summary
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

    # Episodeモデル更新 =======================================
    def update_episode
        results = []
        results.push(Episode.save_episode_change(params, session[:user_id]))
        check_db_saved(results)
    end


    # AnalysisQ1 & AnalysisQ2モデル更新 =======================================
    def update_analysis
        results = []
        results.push(AnalysisQ1.save_analysis_q1_change(params, session[:user_id]))
        results.push(AnalysisQ2.save_analysis_q2_change(params, session[:user_id]))
        check_db_saved(results)
    end


    # Summaryモデル更新 =======================================
    def update_summary
        results = []
        results.push(Summary.save_summary_change(params, session[:user_id]))
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
