#!/bin/bash

IP_ADDRESS=$(hostname -I | awk '{print $1}')

# Write environment variables to .env file
cat << EOF > ./web/.env
GRAPHQL_ENDPOINT="https://clubs.iiit.ac.in/graphql"
NEXT_PUBLIC_FILESERVER_URL="https://clubs.iiit.ac.in"
NEXT_PUBLIC_STATIC_URL="https://clubs.iiit.ac.in/static"
NEXT_PUBLIC_CLUB_ID="hacking.club"
EOF

FILE_PATH="web/next.config.js"

# Update the IP address in the file
sed -Ei "s|http://10\.[0-9]+\.[0-9]+\.[0-9]+|https://clubs.iiit.ac.in|g" $FILE_PATH

# cd web
# npm i
# cd ..

docker compose -p sports-web up --build

docker compose -p sports-web down