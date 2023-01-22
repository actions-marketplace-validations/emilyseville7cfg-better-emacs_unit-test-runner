#!/usr/bin/env bash

declare files=("$@")

sudo apt update -y
sudo apt install emacs

for file in "${files[@]}"; do
    emacs -batch -l ert -l "${file}" -f ert-run-tests-batch-and-exit
done
