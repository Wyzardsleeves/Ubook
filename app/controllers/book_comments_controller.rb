class BookCommentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @book = Book.find(params[:book_id])
    @book_comments = @book.book_comments
    render json: @book_comments.arrange_serializable, status: :ok
  end

  def create
    @book_comment = BookComment.new(book_comment_params)
    @book_comment.user_id = current_user.id
    @book_comment.creator = current_user.username
    @book_comment.votes = 0
    authorize @book_comment
    if @book_comment.save
      render json: {success: "Comment changes were successful!"}
    else
      render json: {error: "Comment changes failed to save!"}
    end
  end

  def update
    set_book_comment
    @book_comment.update!(book_comment_params)
    if @book_comment.save
      render json: {success: "Comment changes were successful!"}
    else
      render json: {error: "Comment changes failed to save!"}
    end
  end

  def destroy
    set_book_comment
    @book_comment.destroy!
    if @book_comment.destroy
      render json: {success: "Comment was successfully destroyed!"}
    else
      render json: {error: "Failed to delete comment!"}
    end
  end

  private
  def set_book_comment
    @book_comment = BookComment.find(params[:id])
    authorize @book_comment
  end

  def book_comment_params
    params.permit(:content, :votes, :user_id, :book_id, :parent_id)
  end
end
