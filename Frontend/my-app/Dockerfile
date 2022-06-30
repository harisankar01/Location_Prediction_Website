FROM node:16 as build
ENV NODE_ENV production
RUN mkdir app
COPY . /app/
WORKDIR /app
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN  npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
EXPOSE 80
COPY --from=build /app/build .
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]