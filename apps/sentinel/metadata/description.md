# Sentinel

Sentinel is a tsnet-embedded Tailscale observer. It tracks tailnet netmap changes, detects meaningful diffs, and sends notifications through configurable sinks.

## Features

- Realtime observation via Tailscale IPNBus (`source.mode: realtime`)
- Optional polling mode (`source.mode: poll`)
- Presence event detection (`peer.online`, `peer.offline`)
- Route-based notifier pipeline with multiple sinks
- Always-on local JSON sink (`stdout-debug`) for visibility
- Webhook delivery with retries and structured success/failure logging
- Structured logging with stable `log_source` attribution (`sentinel`, `tailscale`, `sink`)

## Configuration

- Example config: [`config.example.yaml`](config.example.yaml)
- Supports YAML/JSON with `SENTINEL_` environment overrides
- Supports `${VAR_NAME}` interpolation in sink URLs

## Commands

- `run`
- `status`
- `diff`
- `dump-netmap`
- `test-notify`
- `validate-config`

Use `sentinel --help` for full command and flag details.

## Documentation

Operator docs live under [`docs/`](docs/README.md) and are structured for Docsify.

- [Getting Started](docs/getting-started.md)
- [Configuration Reference](docs/configuration.md)
- [Docker Compose and Railway](docs/docker-compose.md)
- [Docker Image](docs/docker-image.md)
- [Release Artifacts](docs/release-artifacts.md)
- [Sinks and Routing](docs/sinks-and-routing.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Command Reference](docs/commands.md)

To preview with Docsify:

```bash
docsify serve docs
```
