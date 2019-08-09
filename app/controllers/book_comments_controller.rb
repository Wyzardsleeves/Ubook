class BookCommentsController < ApplicationController

  def index
    @book = Book.find(params[:book_id])
    @book_comments = @book.book_comments
    render json: @book_comments.arrange_serializable, status: :ok

    #render json: @book_comments.arrange_serializable.map{ |book_comments| book_comments.as_json.merge(username: book_comment.user_id)},
  end

  def create
    @book_comment = BookComment.new(book_comment_params)
    @book_comment.user_id = current_user.id
    @book_comment.votes = 0
    if @book_comment.save
      render json: {success: "Comment changes were successful!"}
    else
      render json: {error: "Comment changes failed to save!"}
    end
  end

  def update
    @book_comment = BookComment.find(params[:id])
    @book_comment.update!
    if @book_comment.save
      render json: {success: "Comment changes were successful!"}
    else
      render json: {error: "Comment changes failed to save!"}
    end
  end

  def destroy
    @book_comment = BookComment.find(params[:id])
    @book_comment.destroy!
    if @book_comment.destroy
      render json: {success: "Comment was successfully destroyed!"}
    else
      render json: {error: "Failed to delete comment!"}
    end
  end

  private
  def book_comment_params
    params.permit(:content, :votes, :user_id, :book_id, :parent_id)
  end
end
