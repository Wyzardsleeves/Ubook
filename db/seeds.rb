# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
  {email: "test1@gmail.com", password: "helloworld"},
  {email: "test2@gmail.com", password: "helloworld"},
  {email: "admin1@gmail.com", password: "helloworld"},
  {email: "admin2@gmail.com", password: "helloworld"},
  {email: "chiefAdmin@gmail.com", password: "helloworld"}
])

Book.create!([
  {title: "Prowlers", description: "Pseudo warewolf thriller by Christopher Golden", user_id: 1},
  {title: "The Quaker of Philidelphia", description: "Fake and bogus description for a fake and bogus book with a cliche title.", user_id: 2},
  {title: "Conquer Your Enemies: 31 Steps to Winning the Deal", description: "Fake and bogus description for a fake and bogus book with a cliche title.", user_id: 2},
  {title: "2007-2013 Mazda 3 Owner's Manual", description: "Fake and bogus description for a fake and bogus book with a cliche title.", user_id: 2},
  {title: "Savage Lands of Dovia", description: "The lands of Dovia have been overrun by savages and beast. In this epic journey, Tate must capture the Mcguffin!", user_id: 2},
  {title: "Savage Lands of Dovia II", description: "Sequel in The lands of Dovia have been overrun by savages and beast. In this epic journey, Tate must capture the Mcguffin!", user_id: 2}
])

BookComment.create([
  {user_id: 1, book_id: 1, content: "This is a comment!", votes: 4},
  {user_id: 2, book_id: 1, content: "This Book is awesome!", votes: 3},
  {user_id: 3, book_id: 2, content: "Keep up the good work! I'm rooting for you!", votes: 1},
  {user_id: 1, book_id: 2, content: "This Book is going along well! Don't stop writing.", votes: 1},
  {user_id: 3, book_id: 4, content: "Can't wait until the next chapter!", votes: 4},
  {user_id: 1, book_id: 1, content: "Oh what a cliffhanger! Hurry with the next chapter please.", votes: 4},
  {user_id: 1, book_id: 2, content: "The is getting good....", votes: 1},
  {user_id: 2, book_id: 4, content: "Hey, we go to school together! I didn't know that you were such a good writer!", votes: 2},
  {user_id: 2, book_id: 5, content: "Liked and subscribed!", votes: 7}
])

Faq.create!([
  {question: "What is this site about?", answer: "This site is basically the Youtube of books!"},
  {question: "What formats can I upload?", answer: "At the moment we are only taking PDF's"},
  {question: "Can I monetize the books I upload?", answer: "I'm working on it. I just gave birth, give me a chance to cut the umbilical!"}
])

puts "#{User.count} users created!"
puts "#{Book.count} books created for users!"
puts "#{BookComment.count} books created for users!"
puts "#{Faq.count} frequently asked questions created!"

User.all.each do |x|
  puts "#{x.email} made!"
end

Book.all.each do |book|
  puts "#{book.title} made!"
end

BookComment.all.each do |book|
  puts "#{book.content} made!"
end

Faq.all.each do |x|
  puts "#{x.question} - #{x.answer}"
end
