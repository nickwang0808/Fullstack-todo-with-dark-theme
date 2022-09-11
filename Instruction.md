# Instruciton on how to run the code

1. Please make sure you have the latest sqlite installed, run `sudo apt install sqlite3` to do so
2. `npm i` on both /frontend and /backend dir

## Development

1. `npm run dev` in /backend
2. `npm start` in /frontend
3. there should be a /data dir created in /backend, that's the sqlite persistent data file
4. `npm test` on both dir will run tests, backend uses in-memory sqlite as the db in tests

## Deployment

1. `npm build && npm start` in /backend
2. `npm build` in /frontend
