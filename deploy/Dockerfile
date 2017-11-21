FROM private-registry.sohucs.com/kuaizhan-plf/node-env:build-env

ADD ./ /pumpkin-b/

RUN export PATH=$PATH:/opt/kuaizhan/bin && \
    cd /pumpkin-b/ && \
    # mv /nodejs/node_modules node_modules && \
    npm install && \
    npm run build && \
    npm start -- --port=80
    # ./node_modules/.bin/gulp bundle
EXPOSE 80

ENTRYPOINT cd /pumpkin-b/ && \
    # cp ./deploy/env/$ENV_NAME.json ./conf.json && \
    NODE_ENV=$ENV_NAME /opt/kuaizhan/bin/node index.js --port=80
