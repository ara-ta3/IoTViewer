NPM=npm

install:
	$(NPM) install

run:
	$(NPM) run electron

build:
	$(NPM) run build

build/watch:
	$(NPM) run build-watch
