#!/bin/bash
project_path=$PWD

mkdir -p ./public/scripts
cp ./public/*.js ./public/scripts
cp ./public/*.ico ./public/images

for module in fonts css images scripts

do
cd $project_path/public/$module
for entry in ./*
do
    echo ${entry}
	filename=${entry##*/}
	path=$PWD/$filename
	remote_path=/public-b/$filename
	curl -f -F file=@$path -F remote_path=$remote_path -F bucket_name=static -F disable_async=true "http://cos.kuaizhan.sohuno.com/api/v2/upload"
done
done
