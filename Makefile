NPM=npm

run: build
	$(NPM) run electron

build:
	$(NPM) run build

build/watch:
	$(NPM) run build-watch
