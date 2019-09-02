class FaqPolicy < ApplicationPolicy
  attr_reader :user, :faq

  def initialize(user, faq)
    @user = user
    @faq = faq
  end

  # CRUD actions
  def index?
    true
  end

  def create?
    user_is_admin?
  end

  def update?
    user_is_admin?
  end

  def destroy?
    user_is_admin?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end

  #custom methods
  private
  def user_is_owner?
    @book.user_id == @user.id
  end

  def user_is_admin?
    @user.role == 'admin' || @user.role == 'chiefAdmin'
  end

  def user_is_chiefAdmin?
    @user.role == 'chiefAdmin'
  end
end
