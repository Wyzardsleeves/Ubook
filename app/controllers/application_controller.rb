class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery
  skip_before_action :verify_authenticity_token, raise: false
end
