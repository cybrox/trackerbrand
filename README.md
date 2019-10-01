# Trackerbrand
Trackerbrand is a simple proof-of-concept location history map. In its current use-case, data is added to the local Trackerbrand database ([lowdb](https://github.com/typicode/lowdb)) via HTTP, coming from either a local script managing a GPS receiver or from remote via HTTP or HTTP via LoRaWAN gatewy.

## Usage
* Map tiles are added as described in [this stackoverflow post](https://stackoverflow.com/a/43608920)
* The databse must be created via `POST` request to `/position/setup`
