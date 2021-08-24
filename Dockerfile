FROM nginx:alpine


ADD ./build/ /usr/share/nginx/html/yst-yd/

COPY ./default.conf /etc/nginx/conf.d/