class AccountsController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    @user_books = @user.books
    @user_comments = @user.book_comments
    render json: {
      user_data: @user,
      user_books: @user_books,
      user_comments: @user_comments,
    }
  end

end
