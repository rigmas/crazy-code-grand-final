#!/bin/bash

echo "Install dependencies..."
npm install

echo "Stop running hackglobal-be app.."
pm2 stop hackglobal-be

echo "Start or restart current app.."
pm2 start hackglobal-be --name hackglobal-be || pm2 restart hackglobal-be

