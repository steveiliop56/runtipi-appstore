# OpenFSD

**OpenFSD** is an open-source multiplayer flight simulation server implementing the modern VATSIM FSD protocol. It connects pilots and air traffic controllers in a shared virtual environment.

## About

Flight Sim Daemon (colloquially known as FSD) is the software/protocol responsible for connecting home flight simulator clients to a single, shared multiplayer world on hobbyist networks such as [VATSIM](https://vatsim.net/docs/about/about-vatsim) and [IVAO](https://www.ivao.aero/).
FSD was originally written in the late 90's by [Marty Bochane](https://github.com/kuroneko/fsd) for [SATCO](https://web.archive.org/web/20000619145015/http://www.satco.org/), later to be forked and taken closed-source by VATSIM in 2001.
As of May 2025, FSD is still used to facilitate over 140,000 active members connecting their flight simulators to the [network](https://vatsim-radar.com/).

## Features

- Facilitate multiplayer flight simulation with VATSIM protocol compatibility.
- Integrate web-based management for users, settings, and connections.
- Support SQLite and PostgreSQL for persistent storage.

## API

The web server exposes APIs under `/api/v1` for authentication, user management, and configuration. Although a basic web interface is provided, users are encouraged to call this API from their own external applications. See the [API](https://github.com/renorris/openfsd/tree/main/web) documentation.
