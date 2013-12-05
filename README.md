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


## Sample Output

### JSON

```json
[
    {
        "Time": "2013-12-01 16:08:00",
        "Voltage": "0",
        "Power": "0",
        "Power Factor": "0",
        "Current": "0",
        "Frequency": "0",
        "Device Status": "N/A"
    },
    {
        "Time": "2013-12-01 16:09:00",
        "Voltage": "118.995",
        "Power": "88.1395",
        "Power Factor": "0.98415",
        "Current": "0.75262",
        "Frequency": "59.9584",
        "Device Status": "On"
    },
    {
        "Time": "2013-12-01 16:10:00",
        "Voltage": "119.093",
        "Power": "88.3395",
        "Power Factor": "0.983776",
        "Current": "0.75397",
        "Frequency": "59.9584",
        "Device Status": "On"
    }
]
```

### CSV

```
Report generated on: Mon, 01 Dec 13 16:12:30 +0000
Time,Voltage,Power,Power Factor,Current,Frequency,Device Status
2013-12-01 16:08:00,0,0,0,0,0,N/A
2013-12-01 16:09:00,118.995,88.1395,0.98415,0.75262,59.9584,On
2013-12-01 16:10:00,119.093,88.3395,0.983776,0.75397,59.9584,On
```
