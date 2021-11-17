#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
# Takes all articles in ../../devhub-content-integration and imports into CMS
# Write generic function for one article
function parseRSTToMD {
  # Use pandoc with gfm option
  pandoc $1 -f rst -t gfm --extract-media=https://www.mongodb.com/developer --resource-path=../devhub-content-integration/source/
}

parseRSTToMD $1

# Push to CMS env of choice
