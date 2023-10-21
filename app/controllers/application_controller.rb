class ApplicationController < ActionController::Base
    before_action :set_user_id

    def set_user_id
        @current_user = User.find_by(id: session[:user_id])
    end
    
    # ログイン状態かを認証する
    def authenticate_user
        if @current_user == nil
            flash[:notice] = "ログインが必要です"
            redirect_to("/login")
        end
    end
    
    def forbid_login_user
        if @current_user
            flash[:notice] = "すでにログインしています"
            redirect_to("/posts/index")
        end
    end
end
