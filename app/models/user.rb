require 'digest'

class User < ActiveRecord::Base
    attr_accessible :username, :email, :password
    has_many :posts, :dependent => :destroy

    # Uniqueness will start to fail if traffic increases.  Not worried about that at all for now.
    # ^^ This is in 6.22 of the Rails tutorial, if I decide that I need it.
    validates :username, :presence => true, :uniqueness => true 
    validates :email, :presence => true, :uniqueness => true
    validates :password, :presence => true, :confirmation => true, :length => {:within => 6..40}

    before_save :encrypt_password
    

  def self.authenticate(username, submitted_password)
    user = User.find_by_username(username)
    return nil  if user.nil?
    return user if user.has_password?(submitted_password)
  end

  def self.authenticate_with_salt(id, cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt) ? user : nil
  end

  def has_password?(submitted_password)
    encrypted_password == encrypt(submitted_password)
  end

  private

    def encrypt_password
      self.salt = make_salt unless has_password?(password)
      self.encrypted_password = encrypt(password)
    end

    def encrypt(string)
      secure_hash("#{salt}--#{string}")
    end

    def make_salt
      secure_hash("#{Time.now.utc}--#{password}")
    end

    def secure_hash(string)
      Digest::SHA2.hexdigest(string)
    end


end
