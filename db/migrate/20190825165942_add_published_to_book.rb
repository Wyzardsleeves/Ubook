class AddPublishedToBook < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :published, :bool
  end
end
