FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=VerdeValleyRail

ADD verde-valley-rail.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]