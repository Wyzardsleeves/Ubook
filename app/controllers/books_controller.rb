class BooksController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def index
    @books = Book.all
    render json: @books, status: :ok
  end

  def show
    @book = Book.find(params[:id])
    render json: @book, status: :ok
  end

  def create
    @book = Book.new(book_params)
    @book.user_id = current_user.id
    if @book.save
      render json: {success: "#{@book.title} was saved successfully!"}
    else
      render json: {error: "Book creation failed"}
    end
  end

  def update
    #This will update
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
    params.permit(:title, :description, :user_id)
  end
end
