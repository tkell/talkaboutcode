require 'uri'
require 'net/http'
require 'rubygems'
require 'json'

module PostsHelper

    def embed(url)
        url = "http://soundcloud.com/oembed?url=" +url + "&format=json"
        r = Net::HTTP.get(URI(url))
        oembed_results = JSON.parse(r)
        puts "debugz"
        puts oembed_results["html"].html_safe.class
        oembed_results["html"].html_safe
    end

end
