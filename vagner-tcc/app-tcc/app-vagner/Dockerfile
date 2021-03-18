FROM mhart/alpine-node
ARG AMBIENTE
ENV NODE_ENV=${AMBIENTE}
WORKDIR /app
COPY /app /app
RUN npm install --loglevel verbose
CMD [ "sh", "-c" , "npm start" ]
