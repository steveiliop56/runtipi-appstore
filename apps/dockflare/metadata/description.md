# Dockflare

DockFlare simplifies Cloudflare Tunnel and Zero Trust Access policy management by using Docker labels for automated configuration, while also providing a powerful web UI for manual service definitions and policy overrides. It enables secure, hassle-free public access to both Dockerized and non-Dockerized applications with minimal direct interaction with Cloudflare. Acting as a dynamic, self-hosted ingress controller, DockFlare offers persistent, UI-driven control over access policies centralizing and streamlining your access management.

## Features

- **Unified Cloudflare Tunnel Management**:
  - Automates Tunnel creation/use & `cloudflared` agent lifecycle (optional internal deployment or external).
- **Dynamic Ingress via Docker Labels**:
  - Auto-configures Tunnel ingress & DNS from Docker labels (e.g., `hostname`, `service`, `path`).
  - Supports various service types (`http`, `https`, `tcp`, `ssh`, `rdp`, `http_status`).
  - Controls `no_tls_verify` and `originServerName` (SNI) for origin connections.
- **Manual Ingress Rule Management**:
  - Add & manage public hostnames for non-Docker services (e.g., router, NAS) via Web UI; DockFlare handles Tunnel rules & DNS.
- **Versatile Access Policy Control (Docker & Manual)**:
  - Define Cloudflare Access Policies (e.g., `bypass`, `authenticate`, custom JSON) via Docker labels; auto-manages Access Applications.
  - Web UI to manage/override policies for _any_ rule; UI changes persist, override labels, with revert option & clear indicators.
- **Multi-Hostname & Multi-Zone**:
  - Supports multiple hostnames (unique targets, zones, policies) per Docker container (indexed labels) or manual rule.
- **State Persistence & Graceful Deletion**:
  - Configurable grace period for Docker rule cleanup; persists all managed rules, Access App IDs, & UI overrides in `state.json`.
- **Intelligent Reconciliation**:
  - Continuously syncs Docker, manual entries, & saved state (respecting UI overrides) with Cloudflare (Tunnel, DNS, Access Apps); shows UI progress.
- **Comprehensive Web UI (DaisyUI)**:
  - **Dashboard**: Tunnel/agent status & controls.
  - **Unified Rule List**: View/manage all rules (Docker & manual) with status, target, Access Policy (Cloudflare links, UI override badges), & delete options.
  - **Easy Manual Entry**: Add non-Docker services via UI.
  - **Account Tools**: View account tunnels/DNS.
  - **Real-time Logs & Themes**: SSE activity logs & multiple UI themes.
- **Secure & Robust**:
  - Content Security Policy (CSP), API retries, and error reporting.

[Learn more on the GitHub Wiki](https://github.com/ChrispyBacon-dev/DockFlare/wiki)

---

## Web UI Preview

![Web UI example](https://github.com/ChrispyBacon-dev/DockFlare/raw/stable/images/status_web.png)

---

## Getting Started

- Docker: [Install Docker](https://docs.docker.com/engine/install/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)
- Cloudflare Account with:
  - API Token with Account:Cloudflare Tunnel:Edit, Account:Account Settings:Read, Account:Access: Apps and Policies:Edit, Zone:Zone:Read, Zone:DNS:Edit
    ![Cloudflare API](images/cf.png)
    _(Note: Account Settings Read is planned for future features, not strictly required for current core functionality.)_
  - Account ID (found in Cloudflare Dashboard → Overview)
  - Zone ID (found in Cloudflare Dashboard → Overview for your primary domain)
