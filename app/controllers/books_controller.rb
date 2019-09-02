class BooksController < ApplicationController
  #skip_before_action :verify_authenticity_token, except: [:create, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @books = Book.where(published: 1)
    @books_popular = @books.sort_by{|book| book.book_likes.count}.reverse[0..9]
    @books_recent = @books.sort{|a, b| b.created_at <=> a.created_at}[0..9]
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
    set_book
    @creator = User.find_by_id(@book.user_id)
    if current_user.present?
      userData = current_user
    else
      userData = {}
    end
    render json: {bookInfo: @book.as_json.merge(attachment: url_for(@book.document), creator: @creator.username), user: userData, commentCount: @book.book_comments.count}
  end

  def create
    book = Book.new(book_params)
    book.user_id = current_user.id
    book.published = 1
    authorize book
    if book.save
      render json: {success: "#{book.title} was saved successfully!"}
    else
      render json: {error: "Book creation failed"}
    end
  end

  def update
    set_book
    @book.update!(book_params)
    if @book.save
      render json: {success: "Selected book(s) was successfully updated!"}
    else
      render json: {error: "Book deletion failed"}
    end
  end

  def destroy
    set_book
    @book.destroy
    if @book.destroy
      render json: {success: "Selected book(s) was successfully destroyed!"}
    else
      render json: {error: "Book deletion failed"}
    end
  end

  def search
    if(params[:b])
      @books = Book.where("title LIKE ?", "%" + params[:b] + "%")
      render json: @books.where(published: 1).map{ |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count, likeCount: book.book_likes.count)}
    elsif(params[:u])
      @users = User.where("username LIKE ?", "%" + params[:u] + "%")
      render json: @users
    end
  end

  private
  def set_book
    @book = Book.find(params[:id])
    authorize @book
  end

  def book_params
    params.require(:book).permit(:title, :description, :user_id, :published, :document)
  end
end
