build:
	docker build -t=jruz/uploader .

start: build
	docker run --rm -it -p=5000:5000 jruz/uploader

shell: build
	docker run --rm -it -p=5000:5000 jruz/uploader sh
