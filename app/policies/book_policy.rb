class BookPolicy < ApplicationPolicy
  attr_reader :user, :book

  def initialize(user, book)
    @user = user
    @book = book
  end

  # CRUD actions
  def index?
    true
  end

  def show?
    is_published? || user_is_owner?
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
  def is_published?
    @book.published == 1
  end

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
