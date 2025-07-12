#!/bin/bash

# Install Chrome and Chromedriver
apt-get update && apt-get install -y chromium-browser chromium-driver

# Run the Flask app using Gunicorn
gunicorn app:app
