class RepliesController < ApplicationController
  include PostsHelper # tacky but needed for the audio URL generation

  def create
    # need current post and current user.  Look at create in posts_controller

    @post = Post.find(params[:post_id])
    @user = current_user
    audio_url = params[:reply]
    audio_url = audio_url[:audio_url]

    # audio_url = generate_sc_url

    @reply = Reply.new(:audio_url => audio_url, :user => current_user, :post => @post)
    @reply.save

    redirect_to post_path(@post)
  end

end
