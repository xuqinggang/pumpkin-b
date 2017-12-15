FROM private-registry.sohucs.com/nangua/nangua_front_node:v8.9.3

ADD ../ /pumpkin-b/

WORKDIR /pumpkin-b/

RUN ls -al && npm install pumpkin-font-b --registry=http://10.10.126.140:4873 && \
    npm install && \
    npm run build

RUN chmod +x ./deploy_front.sh
RUN ./deploy_front.sh

EXPOSE 80

ENTRYPOINT node server/index.js --port=80 --env='prod'
