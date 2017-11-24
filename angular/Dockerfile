FROM library/node
MAINTAINER "nicolas.rousseau1@gmail.com"
EXPOSE 3000
RUN ["npm", "install", "-g", "angular-1.5-cli"]
WORKDIR /app
ADD . /app
RUN ["npm", "install"]
CMD ["ng", "serve", "--aot" ,"--no-sourcemap"]
