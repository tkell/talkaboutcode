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

    def resolve(url)
        # http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/matas/hobnotropic&client_id=YOUR_CLIENT_ID'
      sc_url = "http://api.soundcloud.com/resolve.json?"
      client_id = "&client_id=aa0146325fed3c61bc6e62357f8b3245"
      url = sc_url + url + client_id
    
      r = Net::HTTP.get_response(URI.parse("http://djfractal.net"))
      r.body
      
    end

end
