FROM orientdb

# Create app directory
WORKDIR /orientdb

COPY local/entry.sh /orientdb
COPY local/bootstrap.sh /orientdb

RUN cp bin/server.sh /etc/init.d/

EXPOSE 2424:2424 
EXPOSE 2480:2480
