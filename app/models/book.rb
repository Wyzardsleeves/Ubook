class Book < ApplicationRecord
  belongs_to :user
  has_many :book_comments, dependent: :destroy
  has_many :book_likes, dependent: :destroy
  has_one_attached :document

  enum category: {
    "Eduction": 0,
    "Children": 1,
    "Romance": 2,
    "Nonfiction": 3,
    "Teen and Young Adult": 4,
    "Biography/Memior": 5,
    "Mystery/Thriller": 6,
    "Science Fiction": 7,
    "Fantasy": 8,
    "Comics and Graphic Novels": 9,
    "Manga": 10,
    "Parenting and Relationships": 11,
    "History": 12,
    "Cook Books": 13,
    "Manuals": 14
  }

  enum rating: {
    "Everyone": 0,
    "Teen": 1,
    "Mature": 2,
    "Adults Only": 3
  }

  validates :title, presence: true
  validates :rating, presence: true
  validates :description, presence: true
  validates :user_id, presence: true
end
