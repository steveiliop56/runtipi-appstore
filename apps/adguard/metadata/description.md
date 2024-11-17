&nbsp;

<p align="center">
  <picture>
    <img alt="AdGuard Home" src="https://github.com/AdguardTeam/AdGuardHome/raw/master/doc/adguard_home_darkmode.svg" width="300px">
  </picture>
</p>
<h3 align="center">Privacy protection center for you and your devices</h3>
<p align="center">
  Free and open source, powerful network-wide ads & trackers blocking DNS server.
</p>
<p align="center">
  <img src="https://cdn.adtidy.org/public/Adguard/Common/adguard_home.gif" width="800"/>
</p>
<hr/>

AdGuard Home is a network-wide software for blocking ads and tracking. After you set it up, it'll cover ALL your home devices, and you don't need any client-side software for that.

It operates as a DNS server that re-routes tracking domains to a “black hole”, thus preventing your devices from connecting to those servers. It's based on software we use for our public [AdGuard DNS] servers, and both share a lot of code.

[AdGuard DNS]: https://adguard-dns.io/

## <a href="#getting-started" id="getting-started" name="getting-started">Getting Started</a>

### <a href="#api" id="api" name="api">API</a>

If you want to integrate with AdGuard Home, you can use our [REST API][openapi]. Alternatively, you can use this [python client][pyclient], which is used to build the [AdGuard Home Hass.io Add-on][hassio].

[hassio]: https://www.home-assistant.io/integrations/adguard/
[openapi]: https://github.com/AdguardTeam/AdGuardHome/tree/master/openapi
[pyclient]: https://pypi.org/project/adguardhome/

## <a href="#comparison" id="comparison" name="comparison">Comparing AdGuard Home to other solutions</a>

### <a href="#comparison-adguard-dns" id="comparison-adguard-dns" name="comparison-adguard-dns">How is this different from public AdGuard DNS servers?</a>

Running your own AdGuard Home server allows you to do much more than using a public DNS server. It's a completely different level. See for yourself:

- Choose what exactly the server blocks and permits.

- Monitor your network activity.

- Add your own custom filtering rules.

- **Most importantly, it's your own server, and you are the only one who's in control.**

### <a href="#comparison-pi-hole" id="comparison-pi-hole" name="comparison-pi-hole">How does AdGuard Home compare to Pi-Hole</a>

At this point, AdGuard Home has a lot in common with Pi-Hole. Both block ads and trackers using the so-called “DNS sinkholing” method and both allow customizing what's blocked.

> We're not going to stop here. DNS sinkholing is not a bad starting point, but this is just the beginning.

AdGuard Home provides a lot of features out-of-the-box with no need to install and configure additional software. We want it to be simple to the point when even casual users can set it up with minimal effort.

> Some of the listed features can be added to Pi-Hole by installing additional software or by manually using SSH terminal and reconfiguring one of the utilities Pi-Hole consists of. However, in our opinion, this cannot be legitimately counted as a Pi-Hole's feature.

| Feature                                                                 | AdGuard&nbsp;Home | Pi-Hole                                                 |
| ----------------------------------------------------------------------- | ----------------- | ------------------------------------------------------- |
| Blocking ads and trackers                                               | ✅                | ✅                                                      |
| Customizing blocklists                                                  | ✅                | ✅                                                      |
| Built-in DHCP server                                                    | ✅                | ✅                                                      |
| HTTPS for the Admin interface                                           | ✅                | Kind of, but you'll need to manually configure lighttpd |
| Encrypted DNS upstream servers (DNS-over-HTTPS, DNS-over-TLS, DNSCrypt) | ✅                | ❌ (requires additional software)                       |
| Cross-platform                                                          | ✅                | ❌ (not natively, only via Docker)                      |
| Running as a DNS-over-HTTPS or DNS-over-TLS server                      | ✅                | ❌ (requires additional software)                       |
| Blocking phishing and malware domains                                   | ✅                | ❌ (requires non-default blocklists)                    |
| Parental control (blocking adult domains)                               | ✅                | ❌ (requires non-default blocklists)                    |
| Force Safe search on search engines                                     | ✅                | ❌                                                      |
| Per-client (device) configuration                                       | ✅                | ✅                                                      |
| Access settings (choose who can use AGH DNS)                            | ✅                | ❌                                                      |
| Running [without root privileges][wiki-noroot]                          | ✅                | ❌                                                      |

[wiki-noroot]: https://adguard-dns.io/kb/adguard-home/getting-started/#running-without-superuser

### <a href="#comparison-adblock" id="comparison-adblock" name="comparison-adblock">How does AdGuard Home compare to traditional ad blockers</a>

It depends.

DNS sinkholing is capable of blocking a big percentage of ads, but it lacks the flexibility and the power of traditional ad blockers. You can get a good impression about the difference between these methods by reading [this article][blog-adaway], which compares AdGuard for Android (a traditional ad blocker) to hosts-level ad blockers (which are almost identical to DNS-based blockers in their capabilities). This level of protection is enough for some users.

Additionally, using a DNS-based blocker can help to block ads, tracking and analytics requests on other types of devices, such as SmartTVs, smart speakers or other kinds of IoT devices (on which you can't install traditional ad blockers).

### <a href="#comparison-limitations" id="comparison-limitations" name="comparison-limitations">Known limitations</a>

Here are some examples of what cannot be blocked by a DNS-level blocker:

- YouTube, Twitch ads;

- Facebook, Twitter, Instagram sponsored posts.

Essentially, any advertising that shares a domain with content cannot be blocked by a DNS-level blocker.

Is there a chance to handle this in the future? DNS will never be enough to do this. Our only option is to use a content blocking proxy like what we do in the standalone AdGuard applications. We're [going to bring][issue-1228] this feature support to AdGuard Home in the future. Unfortunately, even in this case, there still will be cases when this won't be enough or would require quite a complicated configuration.

[blog-adaway]: https://adguard.com/blog/adguard-vs-adaway-dns66.html
[issue-1228]: https://github.com/AdguardTeam/AdGuardHome/issues/1228
