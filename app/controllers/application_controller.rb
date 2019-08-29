class ApplicationController < ActionController::Base

  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :username, :bio, :password, :password_confirmation])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :username, :email, :bio, :password, :remember_me])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :bio, :password, :password_confirmation, :current_password])
  end

  include Pundit
  protect_from_forgery
  skip_before_action :verify_authenticity_token, raise: false
end
