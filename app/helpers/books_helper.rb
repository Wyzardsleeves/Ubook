module BooksHelper
  #stuff might go here
  def document_url
    Rails.application.routes.url_helpers.rails_blob_path(self.document, only_path: true)
  end
end
