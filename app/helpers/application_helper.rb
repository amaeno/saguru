module ApplicationHelper
    # ************************************************
    #   @breief:  param[1]のURLに滞在する場合、指定したクラスを追記
    #   @param[1]: クラス設定をしたいページのURL
    #   @param[2]: 追記したいクラス名
    #   @return: 追記したいクラス名 or 空文字列
    # ************************************************
    def set_class_only_current_page(url, class_name)
        current_url = request.fullpath
        result = ""

        if current_url == url
            result = class_name
        # アカウント削除ページ遷移時は"アカウント編集"でクラス設定
        elsif (current_url == "/delete_account") && (url == "/setting")
            result = class_name
        # バリデーションエラーでrenderの際のヘッダークラス付与
        else
            case current_url
                when "/users/create"
                    if url == "/signup"
                        result = class_name
                    end
                when "/users/update"
                    if url == "/setting"
                        result = class_name
                    end
                when "/users/authorize"
                    if url == "/login"
                        result = class_name
                    end
                else
                    result = ""
            end
        end

        return result
    end
end
