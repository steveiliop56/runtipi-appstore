# Gatus

Gatus is a developer-oriented health dashboard that gives you the ability to monitor your services using HTTP, ICMP, TCP, and even DNS
queries as well as evaluate the result of said queries by using a list of conditions on values like the status code,
the response time, the certificate expiration, the body and many others. The icing on top is that each of these health
checks can be paired with alerting via Slack, Teams, PagerDuty, Discord, Twilio and many more.

I personally deploy it in my Kubernetes cluster and let it monitor the status of my
core applications: https://status.twin.sh/

## Why Gatus?

Before getting into the specifics, I want to address the most common question:

> Why would I use Gatus when I can just use Prometheus’ Alertmanager, Cloudwatch or even Splunk?

Neither of these can tell you that there’s a problem if there are no clients actively calling the endpoint.
In other words, it's because monitoring metrics mostly rely on existing traffic, which effectively means that unless
your clients are already experiencing a problem, you won't be notified.

Gatus, on the other hand, allows you to configure health checks for each of your features, which in turn allows it to
monitor these features and potentially alert you before any clients are impacted.

A sign you may want to look into Gatus is by simply asking yourself whether you'd receive an alert if your load balancer
was to go down right now. Will any of your existing alerts be triggered? Your metrics won’t report an increase in errors
if no traffic makes it to your applications. This puts you in a situation where your clients are the ones
that will notify you about the degradation of your services rather than you reassuring them that you're working on
fixing the issue before they even know about it.


## Features

The main features of Gatus are:

- **Highly flexible health check conditions**: While checking the response status may be enough for some use cases, Gatus goes much further and allows you to add conditions on the response time, the response body and even the IP address.
- **Ability to use Gatus for user acceptance tests**: Thanks to the point above, you can leverage this application to create automated user acceptance tests.
- **Very easy to configure**: Not only is the configuration designed to be as readable as possible, it's also extremely easy to add a new service or a new endpoint to monitor.
- **Alerting**: While having a pretty visual dashboard is useful to keep track of the state of your application(s), you probably don't want to stare at it all day. Thus, notifications via Slack, Mattermost, Messagebird, PagerDuty, Twilio, Google chat and Teams are supported out of the box with the ability to configure a custom alerting provider for any needs you might have, whether it be a different provider or a custom application that manages automated rollbacks.
- **Metrics**
- **Low resource consumption**: As with most Go applications, the resource footprint that this application requires is negligibly small.
- **[Badges](#badges)**: ![Uptime 7d](https://status.twin.sh/api/v1/endpoints/core_blog-external/uptimes/7d/badge.svg) ![Response time 24h](https://status.twin.sh/api/v1/endpoints/core_blog-external/response-times/24h/badge.svg)
- **Dark mode**
