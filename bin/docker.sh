#!/bin/bash
 
VERSION=$(node -p "require('./package.json').version")
APP=$(node -p "require('./package.json').name")

echo "Build: ${APP}.${VERSION}" 

docker buildx build \
  --no-cache \
  --build-arg VERSION=$VERSION \
  -t ${APP}:$VERSION \
  -f .docker/Dockerfile \
  .

docker tag ${APP}:$VERSION ${APP}:latest


echo "${APP}:${VERSION}" 
echo "${APP}:latest"