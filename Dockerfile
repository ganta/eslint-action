FROM node:12-buster-slim

RUN npm config set progress false

COPY lib /action/lib

ENTRYPOINT ["/action/lib/linter.sh"]
