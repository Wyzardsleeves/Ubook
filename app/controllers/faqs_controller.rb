class FaqsController < ApplicationController

  def index
    @faqs = Faq.all
  end

  def new
  end

  def show
  end
end
