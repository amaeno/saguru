class UsersController < ApplicationController
    def signup
    end

    # 新規ユーザ情報登録
    def create
        @user_info = User.new(
                        name: params[:new_user_name],
                        password: params[:new_user_password]
                    )

        if @user_info.save
            session[:user_id] = @user_info.id
            flash[:notice] = "ユーザ登録が完了しました"
            redirect_to("/")
        else
            # DB保存失敗時は登録画面へ戻る
            @error_message = "このユーザ名またはパスワードはすでに登録されています"
            @new_user_name = params[:new_user_name]
            @new_user_password = params[:new_user_password]
            render("users/signup")
        end

    end

    def login

    end

    # ユーザ情報を照合
    def authorize
        @user_info = User.find_by(
                        name: params[:user_name],
                        password: params[:user_password]
                    )

        if @user_info
            session[:user_id] = @user_info.id
            flash[:notice] = "ログインしました"
            redirect_to("/")
        else
            # DBに該当ない時はログイン画面へ戻る
            @error_message = "ユーザ名またはパスワードが間違っています"
            @user_name = params[:user_name]
            @user_password = params[:user_password]
            render("users/login")
        end
    end
end
