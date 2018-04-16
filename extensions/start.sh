#!/bin/bash

(cd ..; gulp watch) &
(watchify index.js -o bundle.js --debug --verbose) &
open index.html