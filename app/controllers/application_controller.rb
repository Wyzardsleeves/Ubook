class ApplicationController < ActionController::Base
  #Something to do with custom fields in the devise views
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :username, :bio, :agreed, :password, :password_confirmation])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :username, :email, :bio, :password, :remember_me])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :bio, :agreed, :password, :password_confirmation, :current_password])
  end

  #Pundit
  include Pundit
  protect_from_forgery with: :null_session
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private
  def user_not_authorized(exception)
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to root_path
  end
end
