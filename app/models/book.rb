class Book < ApplicationRecord
  belongs_to :user
  has_many :book_comments, dependent: :destroy
  has_many :book_likes, dependent: :destroy
  has_one_attached :document

  validates :title, presence: true
  validates :description, presence: true
  validates :user_id, presence: true
end
