class User < ActiveRecord::Base
    has_many :posts

    # Uniqueness will start to fail if traffic increases.  Not worried about that at all for now.
    validates :username, :presence => true, :uniqueness => true 
    validates :email, :presence => true, :uniqueness => true
    validates :password, :presence => true, :confirmation => true, :length => {:within => 6..40}

  # I AM NOT STORING PASSWORDS PROPERLY.  I NEED TO FIX THIS BEFORE I DEPLOY THIS TO THE GENERAL PUBLIC
  # NO, REALLY, I NEED TO FIX THIS BEFORE I LET OTHER PEOPLE USE THIS.  
  def self.authenticate(username, submitted_password)
    user = User.find_by_username(username)
    return nil  if user.nil?
    return user if user.password == submitted_password
  end

  def self.authenticate_with_salt(id, cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt) ? user : nil
  end

end
