FROM nginx:alpine
LABEL author="Ing. Jose Perez - Soltecn Peru"
COPY ./Angular/AppWebProdFarm /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]