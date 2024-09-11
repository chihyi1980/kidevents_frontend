sudo docker rm kidevents-frontend
sudo docker run --name kidevents-frontend --network my-network -p 5000:5000 -d kidevents-frontend:latest