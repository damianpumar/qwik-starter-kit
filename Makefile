docker/build:
	docker build  -t qwik-docker .
docker/run:
	docker run -p 3000:3000 qwik-docker
docker/stop:
	docker stop $(docker ps -q --filter ancestor=qwik-docker )
