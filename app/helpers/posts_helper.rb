require 'uri'
require 'net/http'

module PostsHelper

    def embed(url)
        url = "http://soundcloud.com/oembed?url=" +url + "&format=json"
        r = Net::HTTP.get(URI(url))
        puts "debugz"
        puts r
        oembed_results = JSON.parse(r)
        oembed_results["html"].html_safe
    end

end
