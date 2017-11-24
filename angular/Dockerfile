FROM library/node
MAINTAINER "nicolas.rousseau1@gmail.com"
EXPOSE 3000
WORKDIR /app
ADD . /app
RUN ["npm", "install", "-g", "angular-1.5-cli"]
RUN ["npm", "install"]
CMD ["ng", "serve", "--proxy-config", "proxy.conf.json", "--aot" ,"--no-sourcemap"]
