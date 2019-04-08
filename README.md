## Stupid test
Simple docker compose setup to test node out of memory

### Setup
```
+--------+    +--------+    +----------+
| client | -> | server | -> | external |
+--------+    +--------+    +----------+
```

- **client** app make request to **server** app and print count and duration information. Requests are made in regular interval configurable with `INTERVAL` env var on the **client** app
- **server** app receives request and makes a request to **external** app with timeout configured by `EXT_TIMEOUT` env var, return when **external** app returns
- **server** optionally read a large file at the same time it sent request to **external** services, the intention is to block the event loop for a while to check behavior, enabled by setting `READ_LARGE_FILE` to `"true"`
- **external** app receives request and response with a delay. For every request it gets, the delay will be increased by an increment specify by `INCREMENT` env var, the more request it gets the slower it response. Initial delay is configurable with `DELAY` env var on the **external** app
- All services have memory limited to 100MB (100000000)

#### Env var settings
| service | name | description |
|---|---|---|
| client | INTERVAL | the interval that client send request to **server** |
| server | EXT_TIMEOUT | timeout for the request sent to **external** service |
|        | READ_LARGE_FILE | "true" to read a large file synchronously to block event loop |
| external | DELAY | the delay before responding to requests |
|          | INCREMENT | the amount of time to add to the delay after each request |

### Usage
```
docker-compose build
docker-compose up
```

## Results
### test 1
High request rate from client, long delay from external service
- Setup
  - client: `INTERVAL = 10`
  - server: `EXT_TIMEOUT = 0` `READ_LARGE_FILE=false`
  - external: `DELAY = 1000` `INCREMENT=100`
- Result
  - **server** response gradually becomes slower
  - memory usage of **server** keeps going up, eventually throws OOM error

### test 2
make request with axios with timeout, at the same time run something that blocks the event loop, check if request if fired before timeout.
- Setup
  - client: `INTERVAL = 1000`
  - server: `EXT_TIMEOUT = 1000` `READ_LARGE_FILE=true`
  - external: `DELAY = 0` `INCREMENT=0`
- Result
  - **server** receives the request and was blocked before sending request to **external**
  - some requests has a long delay before returning to **client** due to timeout, but the request doesn't reach **external**