require 'rails_helper'

RSpec.describe BooksController, type: :controller do
  #tests will go here for controller
  context "Test for creating a new book." do
    it "creates a book with a title" do
      book = Book.new(description: "Description", user_id: 1).save
      expect(book).to eq(false)
    end
    it "creates a book with a description" do
      book = Book.new(title: "Title", user_id: 1).save
      expect(book).to eq(false)
    end
    it "creates a book with a user" do
      book = Book.new(title: "Title", description: "Description").save
      expect(book).to eq(false)
    end
    it "should save successfully" do
      book = Book.new(title: 'Title', description: "Description", user_id: 1).save
      expect(book).to be_truthy
    end
  end
end
