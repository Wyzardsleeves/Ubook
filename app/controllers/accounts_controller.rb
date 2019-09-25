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
    @user_books = @user.books.map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)}
    @user_comments = @user.book_comments.map{|comment| comment.as_json.merge(book_data: Book.find_by_id(comment.book_id))}
    @user_book_likes = Book.joins(:book_likes).where(:book_likes => {user_id: @user.id}).map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)}
    render json: {
      user_data: @user,
      user_books: @user_books,
      user_comments: @user_comments,
      user_liked_books: @user_book_likes
    }
  end

end
