class BookLikePolicy < ApplicationPolicy
  attr_reader :user, :book_like

  def initialize(user, book_like)
    @user = user
    @book_like = book_like
  end

  def show?
    true
  end

  def create?
    @user.present?
  end

  def destroy?
    user_is_owner?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end

  #custom methods
  private
  def user_is_owner?
    @book_like.user_id == @user.id
  end

  def user_is_admin?
    @user.role == 'admin' || @user.role == 'chiefAdmin'
  end

  def user_is_chiefAdmin
    @user.role == 'chiefAdmin'
  end
end
