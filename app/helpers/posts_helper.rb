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

    # This works, thanks to Johannes Wagener.  
    def embed(url)
        url = "http://soundcloud.com/oembed?format=json&show_comments=false&url=" + url
        r = Net::HTTP.get(URI.parse(url))
        if r.bytesize > 2
            oembed_results = JSON.parse(r) 
            oembed_html = oembed_results["html"][0..-150] # 100% jank to remove the soundcloud link.  Will get weird if SC change their oEmbed response
            oembed_html = oembed_html.gsub('width="100%"', 'width="820px"')
            oembed_html.html_safe
        else
          error_html = '<span id="sc_html_error">Your audio has not been processed by SoundCloud yet!
                        Please wait a moment, then <a href=''>refresh the page.</a></span>'
          error_html.html_safe   
        end
    end

    # Deprecated, can be removed.
    def resolve(url)
      #http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/matas/hobnotropic&client_id=YOUR_CLIENT_ID'
      sc_url = "http://api.soundcloud.com/resolve.json?"
      client_id = "&client_id=aa0146325fed3c61bc6e62357f8b3245"
      url = sc_url + url + client_id
    
      r = Net::HTTP.get_response(URI.parse("http://djfractal.net"))
      r.body
    end

end
