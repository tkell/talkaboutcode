class User < ActiveRecord::Base
    has_many :posts

    # Uniqueness will start to fail if traffic increases.  Not worried about that at all for now.
    validates :username, :presence => true, :uniqueness => true 
    validates :email, :presence => true, :uniqueness => true
    validates :password, :presence => true, :confirmation => true, :length => {:within => 6..40}

  def self.authenticate(email, submitted_password)
    user = find_by_email(email)
    return nil  if user.nil?
    return user if user.has_password?(submitted_password)
  end

  def self.authenticate_with_salt(id, cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt) ? user : nil
  end

end
