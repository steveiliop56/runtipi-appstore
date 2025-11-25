# Tinyauth Analytics Dashboard

A simple server that periodically fetches data from the analytics server API and displays them in a simple dashboard.

## Configuration

You can configure the server using environment variables, the following options are supported:

| Name               | Type   | Description                                      | Default                    |
| ------------------ | ------ | ------------------------------------------------ | -------------------------- |
| `PORT`             | number | The port to run the server on.                   | `8080`                     |
| `ADDRESS`          | string | The address to bind the server to.               | `0.0.0.0`                  |
| `API_SERVER`       | string | The analytics API server URL to fetch data from. | `https://api.tinyauth.app` |
| `PAGE_SIZE`        | number | Number of instances to display per page.         | `10`                       |
| `REFRESH_INTERVAL` | number | How often to refresh data from API (in minutes). | `30`                       |
