#!/bin/env bash

PACKAGE_VERSION=$(jq -r .version package.json)
MANIFEST_VERSION=$(jq -r .version src/manifest.json)

if [ "$PACKAGE_VERSION" != "$MANIFEST_VERSION" ]; then
    echo "versions mismatch: $PACKAGE_VERSION != $MANIFEST_VERSION";
    exit -1;
fi

GREP_CHANGELOG=$(grep --fixed-strings -o "$PACKAGE_VERSION" CHANGELOG.md | wc -l)

if [ "$GREP_CHANGELOG" != 4 ]; then
    echo "update CHANGELOG: $PACKAGE_VERSION was found $GREP_CHANGELOG times instead of 4";
    exit -1;
fi

set -e

source venv/bin/activate
python mdConverter.py

npm run lint
npm run test
npm run test:ui

rm "track-$MANIFEST_VERSION.zip" --force
zip -r "track-$MANIFEST_VERSION.zip" src -x src/changelog/template.html 
