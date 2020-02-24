class BookLikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @book = Book.find(params[:book_id])
    @book_likes = @book.book_likes
    render json: {data: @book_likes, user: current_user}
  end

  def create
    unless already_liked? #prevents double likes from same user
      @book_like = BookLike.new(book_like_params)
      @book_like.user_id = current_user.id
      if @book_like.save
        render json: {success: "Like has been made by #{current_user.email}"}
      else
        render json: {error: "Failed to save this Like!"}
      end
    else
      render json: {message: "Already liked!"}
    end
  end

  def destroy
    @book_like = BookLike.find(params[:id])
    @book_like.destroy
    if @book_like.destroy
      render json: {success: "Like was successfully destroyed!"}
    else
      render json: {error: "Failed to unlike!"}
    end
  end

  private
  def book_like_params
    params.permit(:user_id, :book_id)
  end

  def already_liked?
    BookLike.where(user_id: current_user.id, book_id: params[:book_id]).exists?
  end
end
