from sec_api import QueryApi, ExtractorApi
# from openai import OpenAI
import csv
extractorApi = ExtractorApi("3742c51d206fac1fc757860676305a16011438f68bd125329cc98f0ad8fe6e0d")
queryApi = QueryApi(api_key = "3742c51d206fac1fc757860676305a16011438f68bd125329cc98f0ad8fe6e0d")

def get_10k(ticker):
    query = {
        "query": { "query_string": { 
            "query": "formType:\"10-K\" AND ticker:"+ticker, # only 10-Ks
        }},
        "from": "0", # start returning matches from position null, i.e. the first matching filing 
        "size": "1"  # return just one filing
    }
    response = queryApi.get_filings(query)
    return response

def get_risks(ticker):
    url = get_10k(ticker)["filings"][0]["linkToFilingDetails"]
    section_text = extractorApi.get_section(url, "1A", "text")
    return section_text

def get_desc(ticker):
    url = get_10k(ticker)["filings"][0]["linkToFilingDetails"]
    section_text = extractorApi.get_section(url, "1", "text")
    return section_text

# def list_flags(ticker):
#     risk_text = get_risks(ticker)
#     if len(risk_text) > max_tokens:
#         risk_text = risk_text[:max_tokens] + "..."
    
#     prompt = f"""
#     The following text is from Section 1A of {ticker}'s 10-K report:
    
#     {risk_text}
    
#     Please provide a concise, comprehensive bullet-point summary of the key risk factors.
#     Focus on the most significant risks.
#     The wording of the bullet points should be akin to "red flags" that would appear on a dating app to warn the user against dating the person. Make it fun and flirty.
#     Each bullet point should be 1-2 sentences maximum.
#     """
    
#     # Call OpenAI API
#     response = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a dating expert telling its users about the eligibility and worthiness of compnay stocks."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.3,
#         max_tokens=1500
#     )
    
#     # Return the generated summary
#     return response.choices[0].message.content

def to_csv():
    tickers = ['COF', 'AAPL', 'NFLX', 'AMZN', 'MCD', 'DUOL', 'TSLA', 'ABNB', 'COST', 'WBA', 'RDDT']
    headers = ['ticker', 'risks']
    risk_data = {}
    rows = []

    for ticker in tickers:
        risks = get_risks(ticker)  # Get the risk data for this ticker
        rows.append([ticker, risks])
    
    with open('risks.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(headers)  # Write the header (just 'Ticker' for now)
        writer.writerows(rows) 

to_csv()