Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: 'users/sessions'}
  resources :users
  resources :faqs
  resources :accounts
  resources :books do
    resources :book_comments
    resources :book_likes
  end

  resources "search", to:"books#search"


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
end
