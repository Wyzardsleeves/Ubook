Rails.application.routes.draw do

  devise_for :users
  resources :faqs
  resources :books do
    resources :book_comments
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"

end
