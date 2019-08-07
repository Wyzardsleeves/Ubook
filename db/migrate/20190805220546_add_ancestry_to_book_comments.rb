class AddAncestryToBookComments < ActiveRecord::Migration[5.2]
  def change
    add_column :book_comments, :ancestry, :string
  end
end
