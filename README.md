### All Set
## You first need to build your images. Navigate to the folder containing docker-compose

- docker-compose build
Run your application.

- docker-compose up -d
## -d stands for detached mode. You may need to give your app a minute to migrate the migrations, set up the backend, and run the servers. To check currently running containers

- docker-compose ps -a

## Visit http://localhost:3000/ and done 👍.

# To stop your App.

- docker-compose down