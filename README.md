# Taiwan Holiday Announce Bot

## About

This is a bot that automatically sends holiday schedule announcements to chat groups based on Taiwan's national holiday data.

## Data

https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/csv/file

## Usage

1. Retrieve and expand data in A1 of a new Google Spread Sheet using the IMPORTDATA function.
2. Run bot.gs periodically on the sheet in 1. and send the specified text to the chat group via Chatbot API.

