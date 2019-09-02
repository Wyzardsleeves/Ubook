class FaqsController < ApplicationController
  skip_before_action :verify_authenticity_token

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
    authorize @faq
    if @faq.save
      flash[:notice] = "FAQ was successfully saved!"
      redirect_to faqs_path
    else
      flash[:alert] = "Error saving FAQ. Unsuccessful >.>"
      render faqs_new_path
    end
  end

  def destroy
    @faq = Faq.find(params[:id])
    authorize @faq
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
