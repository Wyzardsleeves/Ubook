class AddAgreedToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :agreed, :bool
  end
end
