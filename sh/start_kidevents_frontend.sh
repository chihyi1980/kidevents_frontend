sudo docker rm kidevents-frontend
sudo docker run --name kidevents-frontend --network my-network -p 3000:3000 -d kidevents-frontend:latest