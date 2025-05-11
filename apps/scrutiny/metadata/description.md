# Scrutiny

WebUI for smartd S.M.A.R.T monitoring

> NOTE: Scrutiny is a Work-in-Progress and still has some rough edges.

[![](https://github.com/AnalogJ/scrutiny/blob/master/docs/dashboard.png?raw=true)](https://imgur.com/a/5k8qMzS)

## Adding devices

In order to add drives to scrutiny for monitoring you will need to create the `runtipi/user-config/steveiliop56/scrutiny/docker-compose.yml` file with the following content:

```yaml
services:
  scrutiny:
    devices:
      - /dev/sdX
```

## Introduction

If you run a server with more than a couple of hard drives, you're probably already familiar with S.M.A.R.T and the `smartd` daemon. If not, it's an incredible open source project described as the following:

> smartd is a daemon that monitors the Self-Monitoring, Analysis and Reporting Technology (SMART) system built into many ATA, IDE and SCSI-3 hard drives. The purpose of SMART is to monitor the reliability of the hard drive and predict drive failures, and to carry out different types of drive self-tests.

These S.M.A.R.T hard drive self-tests can help you detect and replace failing hard drives before they cause permanent data loss. However, there's a couple issues with `smartd`:

- There are more than a hundred S.M.A.R.T attributes, however `smartd` does not differentiate between critical and informational metrics
- `smartd` does not record S.M.A.R.T attribute history, so it can be hard to determine if an attribute is degrading slowly over time.
- S.M.A.R.T attribute thresholds are set by the manufacturer. In some cases these thresholds are unset, or are so high that they can only be used to confirm a failed drive, rather than detecting a drive about to fail.
- `smartd` is a command line only tool. For head-less servers a web UI would be more valuable.

**Scrutiny is a Hard Drive Health Dashboard & Monitoring solution, merging manufacturer provided S.M.A.R.T metrics with real-world failure rates.**

## Features

Scrutiny is a simple but focused application, with a couple of core features:

- Web UI Dashboard - focused on Critical metrics
- `smartd` integration (no re-inventing the wheel)
- Auto-detection of all connected hard-drives
- S.M.A.R.T metric tracking for historical trends
- Customized thresholds using real world failure rates
- Temperature tracking
- Provided as an all-in-one Docker image (but can be installed manually)
- Configurable Alerting/Notifications via Webhooks
- (Future) Hard Drive performance testing & tracking

## Usage

Once scrutiny is running, you can open your browser to `http://your-server-ip:8028` and take a look at the dashboard.

If you're using the omnibus image, the collector should already have run, and your dashboard should be populate with every
drive that Scrutiny detected. The collector is configured to run once a day, but you can trigger it manually by running the command below.

For users of the docker Hub/Spoke deployment or manual install: initially the dashboard will be empty.
After the first collector run, you'll be greeted with a list of all your hard drives and their current smart status.

```bash
docker exec scrutiny /opt/scrutiny/bin/scrutiny-collector-metrics run
```

## Configuration

By default Scrutiny looks for its YAML configuration files in `/opt/scrutiny/config`

There are two configuration files available:

- Webapp/API config via `scrutiny.yaml` - [example.scrutiny.yaml](example.scrutiny.yaml).
- Collector config via `collector.yaml` - [example.collector.yaml](example.collector.yaml).

Neither file is required, however if provided, it allows you to configure how Scrutiny functions.

## Cron Schedule

Unfortunately the Cron schedule cannot be configured via the `collector.yaml` (as the collector binary needs to be trigged by a scheduler/cron).
However, if you are using the official `ghcr.io/analogj/scrutiny:master-collector` or `ghcr.io/analogj/scrutiny:master-omnibus` docker images,
you can use the `COLLECTOR_CRON_SCHEDULE` environmental variable to override the default cron schedule (daily @ midnight - `0 0 * * *`).

`docker run -e COLLECTOR_CRON_SCHEDULE="0 0 * * *" ...`

## Notifications

Scrutiny supports sending SMART device failure notifications via the following services:

- Custom Script (data provided via environmental variables)
- Email
- Webhooks
- Discord
- Gotify
- Hangouts
- IFTTT
- Join
- Mattermost
- ntfy
- Pushbullet
- Pushover
- Slack
- Teams
- Telegram
- Tulip

Check the `notify.urls` section of [example.scrutiny.yml](example.scrutiny.yaml) for examples.

For more information and troubleshooting, see the [TROUBLESHOOTING_NOTIFICATIONS.md](./docs/TROUBLESHOOTING_NOTIFICATIONS.md) file

### Testing Notifications

You can test that your notifications are configured correctly by posting an empty payload to the notifications health check API.

```bash
curl -X POST http://localhost:8080/api/health/notify
```

## Debug mode & Log Files

Scrutiny provides various methods to change the log level to debug and generate log files.

## Web Server/API

You can use environmental variables to enable debug logging and/or log files for the web server:

```bash
DEBUG=true
SCRUTINY_LOG_FILE=/tmp/web.log
```

You can configure the log level and log file in the config file:

```yml
log:
  file: "/tmp/web.log"
  level: DEBUG
```

Or if you're not using docker, you can pass CLI arguments to the web server during startup:

```bash
scrutiny start --debug --log-file /tmp/web.log
```

## Collector

You can use environmental variables to enable debug logging and/or log files for the collector:

```bash
DEBUG=true
COLLECTOR_LOG_FILE=/tmp/collector.log
```

Or if you're not using docker, you can pass CLI arguments to the collector during startup:

```bash
scrutiny-collector-metrics run --debug --log-file /tmp/collector.log
```
