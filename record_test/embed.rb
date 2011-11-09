# Ruby script to take a username and title, and generate SoundCloud embed code
# CAN WE PING OEMBED

require 'uri'
require 'net/http'
require 'rubygems'
require 'json'


username = "only-you-will-"
# get the "title" from the number of posts / replies by the user.  
# so thor1, thor2, thor3, etc
title = "know"

soundcloud_path = "http://soundcloud.com/hannahread/"
soundcloud_params = "&player_type=tiny"

sc_url = soundcloud_path + username + title + soundcloud_params
url = "http://soundcloud.com/oembed?url=" + sc_url + "&format=json"
url = URI(url)
r = Net::HTTP.get(url)
oembed_results = JSON.parse(r)
print oembed_results["html"]
