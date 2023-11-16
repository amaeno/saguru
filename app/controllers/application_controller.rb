class ApplicationController < ActionController::Base
    before_action :set_user_id

    # 例外処理
    rescue_from Exception, with: :error_500
    rescue_from ActiveRecord::RecordNotFound, ActionController::RoutingError,  with: :error_404

    # ページ遷移毎にログイン中のIDを保持する =======================================
    def set_user_id
        @loggedin_user = User.find_by(id: session[:user_id])
    end
    
    # ログイン状態かを認証する =======================================
    def authenticate_user
        if @loggedin_user == nil
            flash[:alert] = "ログインが必要です"
            redirect_to("/login")
        end
    end

    # ログイン状態でのアクセスを禁止する =======================================
    def forbid_user
        if @loggedin_user
            flash[:alert] = "既にログインしています"
            redirect_to("/saguru")
        end
    end

    # 404エラー画面を表示する =======================================
    def error_404
        render "error_404", status: 404, format: [:html]
    end

    # 500エラー画面を表示する =======================================
    def error_500
        render "error_500", status: 500, format: [:html]
    end
end
