from bs4 import BeautifulSoup
import requests
import time
from urllib.request import Request, urlopen
count = 0

news = {}
symbols = [] # add the tickers for the stocks you want to run

for symbol in symbols:
  news[symbol] = []
  time.sleep(2)

  req = Request(
      url=f'https://finviz.com/quote.ashx?t={symbol}',
      headers={'User-Agent': 'Mozilla/5.0'}
  )
  try:
    webpage = urlopen(req).read()
  except:
    print(count, "Not Found")
    count += 1
    continue
  html = BeautifulSoup(webpage)
  html_table = html.find(id='news-table')
  rows = html_table.findAll('tr')

  for i, table_row in enumerate(rows):
    try:
      link_text = table_row.a.get_text()
      data_text = table_row.td.get_text()
      entry = [link_text.strip(" \r\n"), data_text.strip(" \r\n")]
      news[symbol].append(entry)
    except:
      pass

  count += 1