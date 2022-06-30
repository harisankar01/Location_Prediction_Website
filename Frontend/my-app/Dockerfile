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

COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]