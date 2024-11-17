#!/bin/bash

# Update
apt update

# Install deps
apt install -y curl bash

# Install bun
curl -fsSL https://bun.sh/install | bash

# Run renovate
runuser -u ubuntu renovate