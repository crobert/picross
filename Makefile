start: front server

front:
	@echo "Starting frontend..."
	cd front && npm build

front-dev:
	@echo "Starting frontend..."
	cd front && npm run dev

server:
	@echo "Starting server..."
	cd server && npm build && npm start

server-dev:
	@echo "Starting server..."
	cd server && npm run dev
