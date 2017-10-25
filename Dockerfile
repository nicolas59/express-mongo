FROM library/node
MAINTAINER "nicolas.rousseau1@gmail.com"
EXPOSE 3000
WORKDIR /app
ADD . /app
RUN ["npm", "install"]
CMD ["node", "index.js"]
