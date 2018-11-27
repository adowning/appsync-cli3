#!/bin/bash

# abort on errors
set -e

rm force.txt
echo  `date` > force.txt

# build
npm run build


# navigate into the build output directory
# cd dist


# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
DATE=`date`
# git init
git add -A
git commit -m $DATE

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:adowning/adowning.github.io.git master
git subtree push --prefix dist origin gh-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:adowning/appsync-cli3.git master:gh-pages

cd -

