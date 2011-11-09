require 'uri'
require 'net/http'

module PostsHelper

    def embed(url)
        url = "/oembed?url=" + url + "&format=json"
        http = Net::HTTP.new("soundcloud.com", "80")
        req = Net::HTTP::Get.new(url, {'User-Agent' => 'thoragent'})
        response = http.request(req)

        #r = Net::HTTP.get_response(URI.parse(url))
        r = response.body
        if r.bytesize > 2
            oembed_results = JSON.parse(r)
            oembed_results["html"].html_safe
        else
            'oh no!'
        end
    end

end
