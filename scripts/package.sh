#!/bin/sh

mkdir 'dist'

echo "Packaging single file version"
zip -T -j './dist/dist-sf.zip' './dist-sf/index.html'

echo "Packaging multiple file version"
zip -T -r './dist/dist-mf.zip' './dist-mf/'

echo "Packaging development version"
zip -T -r './dist/dist-dev.zip' './src/'