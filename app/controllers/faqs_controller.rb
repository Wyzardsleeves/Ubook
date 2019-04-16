class FaqsController < ApplicationController

  def index
    @faqs = Faq.all
  end

  def new
    @faq = Faq.new
  end

  def create
    @faq = Faq.new
    @faq.question = params[:faq][:question]
    @faq.answer = params[:faq][:answer]

    if @faq.save
      flash[:notice] = "FAQ was successfully saved!"
      redirect_to faqs_path
    else
      flash[:alert] = "Error saving FAQ. Unsuccessful >.>"
      render faqs_new_path
    end
  end

  def show
  end

  def destroy
    @faq = Faq.find(params[:id])
    @faq.destroy
    
    if @faq.delete
      flash[:notice] = "FAQ was successfully deleted!"
      redirect_to faqs_path
    else
      flash[:alert] = "Error deleting this Faq. Unsuccessful >.>"
      redirect_to faqs_path
    end
  end
end
