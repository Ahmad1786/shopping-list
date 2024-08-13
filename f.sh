#!/bin/bash

echo "# shopping-list" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Ahmad1786/shopping-list.git
git push -u origin main