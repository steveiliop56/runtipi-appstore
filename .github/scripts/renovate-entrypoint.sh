#!/bin/bash

# Update
apt update

# Install deps
apt install -y curl bash

# Install bun
curl -fsSL https://bun.sh/install | bash

# Make sure bun is loaded
source /root/.bashrc 

# Print bun version
bun -v

# Run renovate
runuser -u ubuntu renovate steveiliop56/runtipi-appstore