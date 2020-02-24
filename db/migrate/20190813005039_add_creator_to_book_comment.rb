class AddCreatorToBookComment < ActiveRecord::Migration[5.2]
  def change
    add_column :book_comments, :creator, :string
  end
end
