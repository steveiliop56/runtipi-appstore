# Coder

[Coder](https://coder.com) enables organizations to set up development environments in their public or private cloud infrastructure. Cloud development environments are defined with Terraform, connected through a secure high-speed Wireguard® tunnel, and automatically shut down when not used to save on costs. Coder gives engineering teams the flexibility to use the cloud for workloads most beneficial to them.

- Define cloud development environments in Terraform
  - EC2 VMs, Kubernetes Pods, Docker Containers, etc.
- Automatically shutdown idle resources to save on costs
- Onboard developers in seconds instead of days

## Documentation

Browse our docs [here](https://coder.com/docs) or visit a specific section below:

- [**Templates**](https://coder.com/docs/templates): Templates are written in Terraform and describe the infrastructure for workspaces
- [**Workspaces**](https://coder.com/docs/workspaces): Workspaces contain the IDEs, dependencies, and configuration information needed for software development
- [**IDEs**](https://coder.com/docs/ides): Connect your existing editor to a workspace
- [**Administration**](https://coder.com/docs/admin): Learn how to operate Coder
- [**Premium**](https://coder.com/pricing#compare-plans): Learn about our paid features built for large teams

## Support

Feel free to [open an issue](https://github.com/coder/coder/issues/new) if you have questions, run into bugs, or have a feature request.

[Join our Discord](https://discord.gg/coder) to provide feedback on in-progress features and chat with the community using Coder!

## Integrations

We are always working on new integrations. Please feel free to open an issue and ask for an integration. Contributions are welcome in any official or community repositories.

### Official

- [**VS Code Extension**](https://marketplace.visualstudio.com/items?itemName=coder.coder-remote): Open any Coder workspace in VS Code with a single click
- [**JetBrains Gateway Extension**](https://plugins.jetbrains.com/plugin/19620-coder): Open any Coder workspace in JetBrains Gateway with a single click
- [**Dev Container Builder**](https://github.com/coder/envbuilder): Build development environments using `devcontainer.json` on Docker, Kubernetes, and OpenShift
- [**Module Registry**](https://registry.coder.com): Extend development environments with common use-cases
- [**Kubernetes Log Stream**](https://github.com/coder/coder-logstream-kube): Stream Kubernetes Pod events to the Coder startup logs
- [**Self-Hosted VS Code Extension Marketplace**](https://github.com/coder/code-marketplace): A private extension marketplace that works in restricted or airgapped networks integrating with [code-server](https://github.com/coder/code-server).
- [**Setup Coder**](https://github.com/marketplace/actions/setup-coder): An action to setup coder CLI in GitHub workflows.

### Community

- [**Provision Coder with Terraform**](https://github.com/ElliotG/coder-oss-tf): Provision Coder on Google GKE, Azure AKS, AWS EKS, DigitalOcean DOKS, IBMCloud K8s, OVHCloud K8s, and Scaleway K8s Kapsule with Terraform
- [**Coder Template GitHub Action**](https://github.com/marketplace/actions/update-coder-template): A GitHub Action that updates Coder templates

## Contributing

We are always happy to see new contributors to Coder. If you are new to the Coder codebase, we have
[a guide on how to get started](https://coder.com/docs/CONTRIBUTING). We'd love to see your
contributions!
