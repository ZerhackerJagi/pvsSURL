# pvsSURL
A URL Shortener with lots of features.


## Install

- git clone https://github.com/ZerhackerJagi/pvsSURL
- cd pvsSURL

- (optional) make changes to the settings.
- docker-compose up --build


## Settings (Files)
### Docker based 
- docker-compose.yaml
- Dockerfile
- (optional) docker system network inspect pvssurl_default (to find out the val of the ipv4 used by pvssurl_mariadb. Paste this to the app/settings.py file)


### Application based
- app/settings.py
- app/main.py (if you want to change to port the server runs on)

## Disclaimer
This app was created as a fun project during my studies. There's no warranty that the application is 100% safe or stable. Consider using it for private purposes only.
