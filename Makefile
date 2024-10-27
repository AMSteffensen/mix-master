# Variables
VITE_DIR=frontend
NODE_DIR=backend
REDIS_SERVER = redis-server
REDIS_CLI = redis-cli
NODE_PORT=3000
REDIS_CONFIG = redis.conf
REDIS_DATA_DIR = /path/to/redis/data # Change this to your Redis data directory

# Commands
.PHONY: all start stop status clear-cli flushdb exec-cli

# Start both the frontend and backend
all: start-redis start-node
# Start the Redis server
start-redis:
	@echo "Starting Redis server..."
	redis-server $(REDIS_CONF) &

# Start the Vite frontend
start-vite:
	@echo "Starting Vite development server..."
	cd $(VITE_DIR) && npm run dev &

stop-node:
	@echo "Stopping any process running on port $(NODE_PORT)..."
	@if lsof -t -i:$(NODE_PORT) > /dev/null; then \
		lsof -t -i:$(NODE_PORT) | xargs kill -9; \
		echo "Stopped process running on port $(NODE_PORT)"; \
	else \
		echo "No process found running on port $(NODE_PORT)"; \
	fi

# Start the Node.js backend with Redis
start-node: stop-node
	@echo "Starting Node.js backend..."
	cd $(NODE_DIR) && node server.js &

# Start everything concurrently
start: start-redis start-node start-vite

# Stop the Redis server
stop:
	@echo "Stopping Redis server..."
	$(REDIS_CLI) shutdown

# Check the status of the Redis server
status:
	@echo "Checking Redis server status..."
	$(REDIS_CLI) ping

# Clear all data from Redis using FLUSHALL
clear-cli:
	@echo "Clearing all data from Redis..."
	$(REDIS_CLI) FLUSHALL

# Flush the current database
flushdb:
	@echo "Flushing current database..."
	$(REDIS_CLI) FLUSHDB

# Execute a Redis CLI command
exec-cli:
	@echo "Executing Redis CLI command..."
	$(REDIS_CLI) $(args)

# Help command
help:
	@echo "Makefile for Redis"
	@echo "Usage:"
	@echo "  make start       Start the Redis server"
	@echo "  make stop        Stop the Redis server"
	@echo "  make status      Check Redis server status"
	@echo "  make clear-cli   Clear all data from Redis"
	@echo "  make flushdb     Flush the current database"
	@echo "  make exec-cli    Execute a Redis CLI command (usage: make exec-cli args='YOUR_COMMAND')"
