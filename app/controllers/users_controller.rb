class UsersController < ApplicationController
    before_action :authenticate_user, {only: [:setting, :delete_account]}

    # 新規登録
    def signup
    end

    def create
        @user_info = User.new(
                        name: params[:new_user_name],
                        password: params[:new_user_password]
                    )

        if @user_info.save
            session[:user_id] = @user_info.id

            # 新規登録完了時に初期値エピソード・まとめ記入欄追加
            if Episode.make_new_episode_records(session[:user_id], $START_AGE, $END_AGE) &&
                Summary.make_new_summary_records(session[:user_id]) 
                flash[:notice] = "ユーザ登録が完了しました"
                redirect_to("/")
            else
                flash[:alert] = "サーバ内部エラーが発生しました"
                render "users/signup", status: :unprocessable_entity
            end
        else
            # DB保存失敗時は登録画面へ戻る
            @error_message = @user_info.errors.full_messages
            @new_user_name = params[:new_user_name]
            @new_user_password = params[:new_user_password]
            render "users/signup", status: :unprocessable_entity
        end
    end

    # アカウント照合
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
            render "users/login", status: :unprocessable_entity
        end
    end

    # アカウント編集
    def setting
        @user_info = User.find_by(id: session[:user_id])
        @update_user_name = @user_info.name
    end

    def update
        @user_info = User.find_by(id: session[:user_id])

        # 対象ユーザのレコード編集
        @user_info.name = params[:update_user_name]
        @user_info.password = params[:update_user_password]

        if @user_info.save
            flash[:notice] = "アカウントを更新しました"
            redirect_to("/")
        else
            # DB保存失敗時は登録画面へ戻る
            @error_message = @user_info.errors.full_messages
            @update_user_name = params[:update_user_name]
            @update_user_password = params[:update_user_password]
            render "users/setting", status: :unprocessable_entity
        end
    end

    # ログアウト
    def logout
        session[:user_id] = nil
        flash[:notice] = "ログアウトしました"
        redirect_to("/login")
    end

    # 登録削除
    def delete_account
    end

    def delete
        User.find_by(id: session[:user_id]).destroy
        flash[:notice] = "ユーザ登録を削除しました"
        redirect_to("/signup")
    end
end
