class SessionsController < ApplicationController
  def new
    @title = "Sign In"
  end

  def create
    user = User.authenticate(params[:session][:username], params[:session][:password])
    if user.nil?
    # Should give a nice error message here
      @title = "Sign In"
      render 'new'
    else
    # Sign the user in and redirect to the user's show page.
      sign_in user
      redirect_to user
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end

end
