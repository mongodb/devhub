#!/bin/bash
# Install sitediff if it doesn't exist
if ! command -v sitediff &> /dev/null
then
    echo "sitediff could not be found, please install to your system and add to PATH"
    echo "https://github.com/evolvingweb/sitediff/blob/master/INSTALLATION.md#macos"
    exit
fi
if [ $# -lt 2 ]; 
    then echo "requires two sites to check diff and optional full slug of article"
    exit 2
fi
# Take in two URLs
sitediff init $1 $2
# Compare Articles
sitediff diff --cached=none --paths $3
# Report diff
