## Stupid test
Simple docker compose setup to test node out of memory

### Setup

- *client* app make request to *server* app and print count and duration information. Requests are made in regular interval configurable with `INTERVAL` env var on the *client* app
- *server* app receives request and makes a request to *external* app, return when *external* app returns
- *external* app receivew request and response with a delay. For every request it gets the delay will be increased by 1ms so the more request it gets the slower it response. Initial delay is configurable with `DELAY` env var on the *external* app
- All services have cpus limited to 0.1 and memory limited to 10000000 (10M)

### Usage
```
docker-compose build
docker-compose up
```