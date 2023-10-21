class UsersController < ApplicationController
    before_action :authenticate_user, {only: [:update]}

    # 新規ユーザ登録
    def signup
    end

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
            @error_message = "登録済みまたは不適切な入力です"
            @new_user_name = params[:new_user_name]
            @new_user_password = params[:new_user_password]
            render("users/signup")
        end

    end

    # ユーザ情報照合
    def login
    end

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

    # ユーザ情報編集
    def setting
    end

    def update
        @user_info = User.find_by(id: session[:user_id])

        # 対象ユーザのレコード編集
        @user_info.name = params[:update_user_name]
        @user_info.name = params[:update_user_password]

        if @user_info.save
            flash[:notice] = "ユーザ情報を編集しました"
            redirect_to("/")
        else
            # DB保存失敗時は登録画面へ戻る
            @error_message = "登録済みまたは不適切な入力です"
            @new_user_name = params[:new_user_name]
            @new_user_password = params[:new_user_password]
            render("users/setting")
        end
    end

    # ログアウト
    def logout
        session[:user_id] = nil
        flash[:notice] = "ログアウトしました"
        redirect_to("/login")
    end
end
