import json
from sec_api import QueryApi, ExtractorApi
extractorApi = ExtractorApi("3742c51d206fac1fc757860676305a16011438f68bd125329cc98f0ad8fe6e0d")
queryApi = QueryApi(api_key = "3742c51d206fac1fc757860676305a16011438f68bd125329cc98f0ad8fe6e0d")

class Desc:
    def get_10k(self, ticker):
        query = {
            "query": { "query_string": { 
                "query": "formType:\"10-K\" AND ticker:"+ticker, # only 10-Ks
            }},
            "from": "0", # start returning matches from position null, i.e. the first matching filing 
            "size": "1"  # return just one filing
        }
        response = queryApi.get_filings(query)
        return response
    
    def get_1A(self, ticker):
        url = self.get_10k(ticker)["linkToFilingDetails"]
        section_text = extractorApi.get_section(url, "1A", "text")
