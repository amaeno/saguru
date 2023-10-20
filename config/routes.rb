Rails.application.routes.draw do
  get "/" => "top#index"
  get "/about" => "top#about"
  get "/signup" => "users#signup"
  post "/users/create" => "users#create"
  get "/login" => "users#login"
  post "/users/authorize" => "users#authorize"
end
