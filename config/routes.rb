Rails.application.routes.draw do
  get 'faqs/new'
  get 'faqs/index'
  get 'faqs/show'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"

end
