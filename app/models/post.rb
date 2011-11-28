class Post < ActiveRecord::Base
  attr_accessible :title, :code_snippet, :audio_url

  belongs_to :user
  has_many :replies, :dependent => :destroy

  acts_as_taggable

  # I don't think I want to validate audio_url, because it might take a while to appear...
  # Turning off code_snippet.  Ooops    
  validates :title, :presence => true
  # validates :code_snippet, :presence => true

  default_scope :order => 'posts.created_at DESC'
end
