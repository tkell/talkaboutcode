# Plaintext passwords, baby.

require 'rubygems'
require 'soundcloud'

client = Soundcloud.new({
    :client_id => 'aa0146325fed3c61bc6e62357f8b3245',
    :client_secret => '9f4ec2e6e58186291e4d103370fda2ab',
    :username => 'talkaboutcode@hotmail.com',
    :password => 'tobyjasonomarthor'
    })

puts client.get('/me').username

# So we could save the javascript recorded file to here, and then push it like this.
track = client.post('/tracks', :track => {:title => 'a test track', :asset_data => File.new('someaudiofile.wav')})





