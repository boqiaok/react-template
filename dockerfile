FROM node:alpine  AS build

RUN mkdir - p /home/app
WORKDIR /home/app

COPY package*.json /tmp/
COPY .npmrc /tmp/

RUN cd /tmp && npm install pm2 -g && npm config set registry https://registry.npm.taobao.org && npm install
RUN mkdir -p /home/app && cp -a /tmp/node_modules /home/app/
COPY . /home/app

RUN npm run build


FROM nginx:1.15.2-alpine
# FROM nginx
COPY --from=build /home/app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
