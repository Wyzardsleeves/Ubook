class BooksController < ApplicationController

  def index
    @books = Book.all
    #render json: @books, status: :ok
    render json: @books.map { |book| book.as_json.merge(attachment: url_for(book.document), commentCount: book.book_comments.count) }
  end

  def show
    @book = Book.find(params[:id])
    #render json: @book.as_json(include: :document), status: :ok
    render json: @book.as_json.merge(attachment: url_for(@book.document)), status: :ok
  end

  def create
    book = Book.new(book_params)
    book.user_id = current_user.id
    #book.document.attach(params[:document])
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
