FROM library/node
MAINTAINER "nicolas.rousseau1@gmail.com"
ADD . /
CMD ["npm", ["install"]
RUN ["node index.js"]
