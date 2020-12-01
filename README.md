# envelope-web
![Actions Status](https://github.com/jrs33/envelope-web/workflows/Node%2Ejs%20CI/badge.svg)

Save that $$$

Local Dev Setup Instructions:

0) Designed to be used w/ the corresponding [API](https://github.com/jrs33/envelope-api). Also note the included `.env.development` file expects this API to be running locally on port 8033.
1) Build the dev image `docker build --file Dockerfile.dev --tag envelope-web:1.0 .`
2) Verify the image is present via `docker image ls`
3) Run `docker run --publish 8000:3000 --detach --name envelope-web envelope-web:1.0`. This maps the 8000 port on your local machine to the 3000 port in the container, which is what the app listens on by default.
4) Confirm the container is running by visiting `localhost:8000`. To debug any issues, run `docker ps` and make note of the container id. May be helpful to debug by running `docker logs CONTAINER_ID`. You can also spin up a bash shell on the container using `docker exec -it envelope-web /bin/bash` to make debugging a little easier. If all is good, congrats! You now have a dockerized budget application running on your machine.
5) If you want to stop the container, just execute `docker rm --force envelope-web`
