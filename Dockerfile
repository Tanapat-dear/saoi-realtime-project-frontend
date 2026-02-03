FROM nginx:stable
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5075
CMD ["nginx", "-g", "daemon off;"]