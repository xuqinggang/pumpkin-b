#!/bin/bash
project_path=$PWD

mkdir -p ./public/tmp
mv ./public/*.html ./public/tmp

for module in fonts css images /

do
cd $project_path/public/$module
for entry in ./*
do
    # echo ${entry}
	filename=${entry##*/}
	if [ -f $filename ]; then
    path=$PWD/$filename
	    if [ $module == "/" ]; then
		    remote_path=/pumpkin-b/$filename
        else
		    remote_path=/pumpkin-b/$module/$filename
        fi
		echo $path
		echo $remote_path
	    curl -f -F file=@$path -F remote_path=$remote_path -F bucket_name=static -F disable_async=true "http://cos.kuaizhan.sohuno.com/api/v2/upload"
    fi
done
done

cd $project_path
mv ./public/tmp/*.html ./public
