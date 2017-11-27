FROM private-registry.sohucs.com/kuaizhan-plf/node-env:build-env

ADD ./ /pumpkin-b/

RUN export PATH=$PATH:/opt/kuaizhan/bin && \
    cd /pumpkin-b/ && \
    npm install pumpkin-font-b --registry=http://10.10.126.140:4873 \
    npm install && \
    npm run build

EXPOSE 80

ENTRYPOINT cd /pumpkin-b/ && \
    NODE_ENV=$ENV_NAME /opt/kuaizhan/bin/node server/index.js --port=80
