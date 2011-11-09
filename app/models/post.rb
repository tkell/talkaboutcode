class Post < ActiveRecord::Base
  attr_accessible :title, :code_snippet, :audio_url

  belongs_to :user

  # I don't think I want to validate audio_url, because it might take a while to appear...
  validates :title, :presence => true
  validates :code_snippet, :presence => true

  default_scope :order => 'posts.created_at DESC'
end
