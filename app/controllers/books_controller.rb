class BooksController < ApplicationController
  before_action :set_book, only: %i[show destroy]

  def index
    @books = Books.all
    render json: @books, status: :ok
  end

  def new
    @book = Book.new
    render json: @book, status: :ok
  end

  def show
    @book = Book.find(params[:id])
    render json: @book, status: :ok
  end

  private
  def book_params
    params.permit(:title, :description, :document)
  end

  def set_book
    @book = Book.find(params[:id])
  end
end
