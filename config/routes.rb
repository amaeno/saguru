Rails.application.routes.draw do
  # 自己分析 =======================================
  get "/" => "top#index"
  get "/saguru" => "top#saguru"
  post "/saguru/update" => "top#update"
  # ユーザ登録関連 =======================================
  get "/signup" => "users#signup"
  post "/users/create" => "users#create"
  get "/setting" => "users#setting"
  post "/users/update" => "users#update"
  get "/login" => "users#login"
  get "/logout" => "users#logout"
  post "/users/authorize" => "users#authorize"
  get "/delete_account" => "users#delete_account"
  post "/users/delete" => "users#delete"
  # エラー確認(全パスの全メソッドで404に該当するか確認) =======================================
  match "*path" => "application#error_404", via: :all
end
