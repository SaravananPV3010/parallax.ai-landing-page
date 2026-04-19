#!/bin/bash

# Mock install script for demonstration since original was not found
echo "Installing tool: $2 to $4"
mkdir -p "$4"
touch "$4/$2.skill.md"
echo "Successfully installed $2 skill to $4"
