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

Faq.create!([
  {question: "What is this site about?", answer: "This site is basically the Youtube of books!"},
  {question: "What formats can I upload?", answer: "At the moment we are only taking PDF's"},
  {question: "Can I monetize the books I upload?", answer: "I'm working on it. I just gave birth, give me a chance to cut the umbilical!"}
])

puts "#{User.count} users created!"
puts "#{Faq.count} frequently asked questions created!"

User.all.each do |x|
  puts "#{x.email} made!"
end

Faq.all.each do |x|
  puts "#{x.question} - #{x.answer}"
end
