Rails.application.routes.draw do
  get "/" => "top#index"
  get "/signup" => "users#signup"
  post "/users/create" => "users#create"
end
