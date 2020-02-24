class CreateBookComments < ActiveRecord::Migration[5.2]
  def change
    create_table :book_comments do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true
      t.integer :votes
      t.text :content

      t.timestamps
    end
  end
end
