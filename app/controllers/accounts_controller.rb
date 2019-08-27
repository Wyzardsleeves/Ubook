class AccountsController < ApplicationController

  def index
    @users = User.all
    if current_user.present?
      render json: {current_user: current_user, users: @users}
    else
      render json: {users: @users}
    end
  end

  def show
    @user = User.find(params[:id])
    @user_books = @user.books
    @user_comments = @user.book_comments
    @user_book_likes = Book.joins(:book_likes).where(:book_likes => {user_id: @user.id})
    render json: {
      user_data: @user,
      user_books: @user_books,
      user_comments: @user_comments,
      user_liked_books: @user_book_likes
    }
  end

end
