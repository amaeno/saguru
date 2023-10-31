class ApplicationController < ActionController::Base
    before_action :set_user_id

    # ページ遷移毎にログイン中のIDを保持する
    def set_user_id
        @loggedin_user = User.find_by(id: session[:user_id])
    end
    
    # ログイン状態かを認証する
    def authenticate_user
        if @loggedin_user == nil
            flash[:alert] = "ログインが必要です"
            redirect_to("/login")
        end
    end

    # ログイン状態でのアクセスを禁止する
    def forbid_user
        if @loggedin_user
            flash[:alert] = "既にログインしています"
            redirect_to("/saguru")
        end
    end
end
