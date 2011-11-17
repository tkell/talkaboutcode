class Reply < ActiveRecord::Base
  belongs_to :post
  belongs_to :user

  default_scope :order => 'replies.created_at ASC'
end
