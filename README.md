# Trackerbrand
Trackerbrand is a simple proof-of-concept location history map. In its current use-case, data is added to the local Trackerbrand database ([lowdb](https://github.com/typicode/lowdb)) via HTTP, coming from either a local script managing a GPS receiver or from remote via HTTP or HTTP via LoRaWAN gatewy.

## Usage
* Map tiles are added as described in [this stackoverflow post](https://stackoverflow.com/a/43608920)
* The databse must be created via `POST` request to `/position/setup`

## Map viewing mode
The index file is served at `/position/display`. The passed hash specifies how the map is shown.   
The following are valid display options:
* `#show:current` Shows the current position
* `#show:live` Shows the current position and updates position + map view every 10s
* `#show:history,size=n` Shows a history of the latest `n` positions
* `#show:trip,threshold:t,interval:i` Shows the trip point-by-point. Omitting points with a cumulative distance `<t`, adding a new point every `i`. (`0.0007` has been proven to be a reasonable `t` for skipping port times)

## Submitting lcoations.
Database must be set up once with a `POST /position/setup`
An example of the payload that can be sent by a client to `POST /position/add-remote` to track a position:
```json
{
    "app_id": "segelbrandgps",
    "payload_fields": {
    "x": 23,
    "y": 23,
    "t": 29839283,
    "u": "ges"
    }
}
```
