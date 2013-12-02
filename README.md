# boss-110-smartplug-json-api-proxy

A web proxy for interfacing with the BOSS 110 Smartplug's web interface
exposing device information as JSON and CSV.


## Installation

1. Install from npm:

    ```
    npm install bossproxy
    ```

    Or if installing from master via GitHub:

    ```
    git clone https://github.com/cvan/boss-110-smartplug-json-api-proxy.git
    cd boss-110-smartplug-json-api-proxy
    npm install
    ```

2. Then create and edit your settings file:

    ```
    cp settings.json.dist settings.json
    ```

## Usage

    bossproxy [options]


## Options

    -h, --help        Output usage information
    -p, --port        Port to listen on


## Requirements

* node

    ```
    curl https://npmjs.org/install.sh | sh
    ```


## Usage

Load this URL to get your data in JSON:

    http://localhost:8080

And to get your data in CSV:

    http://localhost:8080/?format=csv
