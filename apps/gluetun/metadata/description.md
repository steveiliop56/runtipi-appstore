# Gluetun VPN client

Lightweight swiss-army-knife-like VPN client to multiple VPN service providers

![Title image](https://raw.githubusercontent.com/qdm12/gluetun/master/title.svg)

## Quick links

- [Features](#features)
- Problem?
  - Check the Wiki [common errors](https://github.com/qdm12/gluetun-wiki/tree/main/errors) and [faq](https://github.com/qdm12/gluetun-wiki/tree/main/faq)
  - [Start a discussion](https://github.com/qdm12/gluetun/discussions)
  - [Fix the Unraid template](https://github.com/qdm12/gluetun/discussions/550)
- Suggestion?
  - [Create an issue](https://github.com/qdm12/gluetun/issues)
- Happy?
  - Sponsor me on [github.com/sponsors/qdm12](https://github.com/sponsors/qdm12)
  - Donate to [paypal.me/qmcgaw](https://www.paypal.me/qmcgaw)
  - Drop me [an email](mailto:quentin.mcgaw@gmail.com)
- **Want to add a VPN provider?** check [the development page](https://github.com/qdm12/gluetun-wiki/blob/main/contributing/development.md) and [add a provider page](https://github.com/qdm12/gluetun-wiki/blob/main/contributing/add-a-provider.md)
- Video:

- [Substack Console interview](https://console.substack.com/p/console-72)

## Features

- Based on Alpine 3.20 for a small Docker image of 35.6MB
- Supports: **AirVPN**, **Cyberghost**, **ExpressVPN**, **FastestVPN**, **Giganews**, **HideMyAss**, **IPVanish**, **IVPN**, **Mullvad**, **NordVPN**, **Perfect Privacy**, **Privado**, **Private Internet Access**, **PrivateVPN**, **ProtonVPN**, **PureVPN**,  **SlickVPN**, **Surfshark**, **TorGuard**, **VPNSecure.me**, **VPNUnlimited**, **Vyprvpn**, **WeVPN**, **Windscribe** servers
- Supports OpenVPN for all providers listed
- Supports Wireguard both kernelspace and userspace
  - For **AirVPN**, **FastestVPN**, **Ivpn**, **Mullvad**, **NordVPN**, **Perfect privacy**, **ProtonVPN**, **Surfshark** and **Windscribe**
  - For **Cyberghost**, **Private Internet Access**, **PrivateVPN**, **PureVPN**, **Torguard**, **VPN Unlimited**, **VyprVPN** and **WeVPN** using [the custom provider](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/custom.md)
  - For custom Wireguard configurations using [the custom provider](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/custom.md)
  - More in progress, see [#134](https://github.com/qdm12/gluetun/issues/134)
- DNS over TLS baked in with service provider(s) of your choice
- DNS fine blocking of malicious/ads/surveillance hostnames and IP addresses, with live update every 24 hours
- Choose the vpn network protocol, `udp` or `tcp`
- Built in firewall kill switch to allow traffic only with needed the VPN servers and LAN devices
- Built in Shadowsocks proxy server (protocol based on SOCKS5 with an encryption layer, tunnels TCP+UDP)
- Built in HTTP proxy (tunnels HTTP and HTTPS through TCP)
- [Connect other containers to it](https://github.com/qdm12/gluetun-wiki/blob/main/setup/connect-a-container-to-gluetun.md)
- [Connect LAN devices to it](https://github.com/qdm12/gluetun-wiki/blob/main/setup/connect-a-lan-device-to-gluetun.md)
- Compatible with amd64, i686 (32 bit), **ARM** 64 bit, ARM 32 bit v6 and v7, and even ppc64le 🎆
- Custom VPN server side port forwarding for [Perfect Privacy](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/perfect-privacy.md#vpn-server-port-forwarding), [Private Internet Access](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/private-internet-access.md#vpn-server-port-forwarding), [PrivateVPN](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/privatevpn.md#vpn-server-port-forwarding) and [ProtonVPN](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md#vpn-server-port-forwarding)
- Possibility of split horizon DNS by selecting multiple DNS over TLS providers
- Can work as a Kubernetes sidecar container, thanks @rorph