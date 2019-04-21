Rails.application.routes.draw do

  get 'books/index'
  get 'books/new'
  get 'books/show'
  resources :faqs

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"

end
