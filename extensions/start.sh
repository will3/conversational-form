#!/bin/bash

open index.html
npx watchify index.js -o bundle.js --debug --verbose