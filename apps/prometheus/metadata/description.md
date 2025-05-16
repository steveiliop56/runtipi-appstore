# Prometheus

Prometheus, a [Cloud Native Computing Foundation](https://cncf.io/) project, is a systems and service monitoring system. It collects metrics
from configured targets at given intervals, evaluates rule expressions,
displays the results, and can trigger alerts when specified conditions are observed.

The features that distinguish Prometheus from other metrics and monitoring systems are:

- A **multi-dimensional** data model (time series defined by metric name and set of key/value dimensions)
- PromQL, a **powerful and flexible query language** to leverage this dimensionality
- No dependency on distributed storage; **single server nodes are autonomous**
- An HTTP **pull model** for time series collection
- **Pushing time series** is supported via an intermediary gateway for batch jobs
- Targets are discovered via **service discovery** or **static configuration**
- Multiple modes of **graphing and dashboarding support**
- Support for hierarchical and horizontal **federation**

## Architecture overview

![Architecture overview](documentation/images/architecture.svg)

### Service discovery plugins

Prometheus is bundled with many service discovery plugins.
When building Prometheus from source, you can edit the [plugins.yml](./plugins.yml)
file to disable some service discoveries. The file is a yaml-formatted list of go
import path that will be built into the Prometheus binary.

After you have changed the file, you
need to run `make build` again.

If you are using another method to compile Prometheus, `make plugins` will
generate the plugins file accordingly.

If you add out-of-tree plugins, which we do not endorse at the moment,
additional steps might be needed to adjust the `go.mod` and `go.sum` files. As
always, be extra careful when loading third party code.

## Using Prometheus as a Go Library

### Remote Write

We are publishing our Remote Write protobuf independently at
[buf.build](https://buf.build/prometheus/prometheus/assets).

You can use that as a library:

```shell
go get buf.build/gen/go/prometheus/prometheus/protocolbuffers/go@latest
```

This is experimental.

### Prometheus code base

In order to comply with [go mod](https://go.dev/ref/mod#versions) rules,
Prometheus release number do not exactly match Go module releases.

For the
Prometheus v3.y.z releases, we are publishing equivalent v0.3y.z tags. The y in v0.3y.z is always padded to two digits, with a leading zero if needed.

Therefore, a user that would want to use Prometheus v3.0.0 as a library could do:

```shell
go get github.com/prometheus/prometheus@v0.300.0
```

For the
Prometheus v2.y.z releases, we published the equivalent v0.y.z tags.

Therefore, a user that would want to use Prometheus v2.35.0 as a library could do:

```shell
go get github.com/prometheus/prometheus@v0.35.0
```

This solution makes it clear that we might break our internal Go APIs between
minor user-facing releases, as [breaking changes are allowed in major version
zero](https://semver.org/#spec-item-4).

## React UI Development

For more information on building, running, and developing on the React-based UI, see the React app's [README.md](web/ui/README.md).

## More information

- Godoc documentation is available via [pkg.go.dev](https://pkg.go.dev/github.com/prometheus/prometheus). Due to peculiarities of Go Modules, v3.y.z will be displayed as v0.3y.z (the y in v0.3y.z is always padded to two digits, with a leading zero if needed), while v2.y.z will be displayed as v0.y.z.
- See the [Community page](https://prometheus.io/community) for how to reach the Prometheus developers and users on various communication channels.
