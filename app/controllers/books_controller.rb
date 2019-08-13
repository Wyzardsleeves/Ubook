class BooksController < ApplicationController

  def index
    @books = Book.all
    @books_recent = @books.reverse[0..9]
    @books_popular = @books.sort_by{|book| book.book_likes.count}.reverse()[0..9]
    if current_user.present?
      @books_liked_by_user = @books.joins(:book_likes).where(:book_likes => {:user_id => current_user.id})[0..9].reverse()
    else
      @books_liked_by_user = []
    end
    render json: {
      recentBooks: @books_recent.map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)},
      mostPopular: @books_popular.map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)},
      likedByUser: @books_liked_by_user.map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)},
    }
  end

  def show
    @book = Book.find(params[:id])
    if current_user.present?
      userData = current_user
    else
      userData = {}
    end
    render json: {bookInfo: @book.as_json.merge(attachment: url_for(@book.document)), user: userData, commentCount: @book.book_comments.count}
  end

  def create
    book = Book.new(book_params)
    book.user_id = current_user.id
    if book.save
      render json: {success: "#{book.title} was saved successfully!"}
    else
      render json: {error: "Book creation failed"}
    end
  end

  def update
    @book = Book.find(params[:id])
    @book.update!(book_params)
    if @book.save
      render json: {success: "Selected book(s) was successfully updated!"}
    else
      render json: {error: "Book deletion failed"}
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    if @book.destroy
      render json: {success: "Selected book(s) was successfully destroyed!"}
    else
      render json: {error: "Book deletion failed"}
    end
  end

  private
  def book_params
    params.require(:book).permit(:title, :description, :user_id, :document)
  end
end
