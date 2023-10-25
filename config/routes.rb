Rails.application.routes.draw do
  get "/" => "top#index"
  post "/update_episode" => "top#update_episode"
  get "/about" => "top#about"
  get "/signup" => "users#signup"
  post "/users/create" => "users#create"
  get "/setting" => "users#setting"
  post "/users/update" => "users#update"
  get "/login" => "users#login"
  get "/logout" => "users#logout"
  post "/users/authorize" => "users#authorize"
end
