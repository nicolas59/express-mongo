FROM library/node
MAINTAINER "nicolas.rousseau1@gmail.com"
EXPOSE 3000
WORKDIR /app
ADD . /app
CMD ["npm", "install"]
RUN ["node", "index.js"]
