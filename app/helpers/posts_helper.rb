require 'uri'
require 'net/http'
require 'cgi'

module PostsHelper

    def generate_sc_url
        sc_path = "http://soundcloud.com/talkaboutcode/"
        sc_path + generate_sc_track_name
    end

    def generate_sc_track_name
        current_user.username.downcase + "-" + current_user.post_count.to_s
    end

    # Let's try switching this to embed.ly
    # embed.ly are a pay service now.  You MOTHERFUCKERS.  
    # back to SoundCloud, for now. I may have to switch this out and pay the $19 when we deploy.  
    def embed(url)
        url = CGI.escape(url)
        url = "/oembed?url=" + url + "&format=json&show_comments=false"
        http = Net::HTTP.new("soundcloud.com", "80")
        req = Net::HTTP::Get.new(url, {'User-Agent' => 'thoragent'})
        response = http.request(req)

        r = response.body
        if r.bytesize > 2
            oembed_results = JSON.parse(r) 
            oembed_html = oembed_results["html"][0..-148] # 100% jank to remove the soundcloud link.  Will get weird if SC change their oEmbed response
            oembed_html.html_safe
        else
          error_html = '<object height="81" width="100%"><span id="html_error">Your audio has not been processed by SoundCloud yet!
                        Please wait a moment, then refresh the page.  </span></object>'
          error_html.html_safe   
        end
    end

    # Given that none of these work, I'd rather use the above embed call
    def resolve(url)
      #http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/matas/hobnotropic&client_id=YOUR_CLIENT_ID'
      sc_url = "http://api.soundcloud.com/resolve.json?"
      client_id = "&client_id=aa0146325fed3c61bc6e62357f8b3245"
      url = sc_url + url + client_id
    
      r = Net::HTTP.get_response(URI.parse("http://djfractal.net"))
      r.body
      
    end

end
