class BookCommentPolicy < ApplicationPolicy
  attr_reader :user, :book_comment

  def initialize(user, book_comment)
    @user = user
    @book_comment = book_comment
  end

  def index?
    true
  end

  def create?
    @user.present?
  end

  def update?
    user_is_owner?
  end

  def destroy?
    user_is_owner? || user_is_admin?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end

  #custom methods
  private
  def user_is_owner?
    @book_comment.user_id == @user.id
  end

  def user_is_admin?
    @user.role == 'admin' || @user.role == 'chiefAdmin'
  end

  def user_is_chiefAdmin
    @user.role == 'chiefAdmin'
  end
end
