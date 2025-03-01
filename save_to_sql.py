import pandas as pd

from sqlalchemy import create_engine

con = create_engine('sqlite:///company_data.db')

chunks = pd.read_csv('combined_data.csv', chunksize=100000)
for chunk in chunks:
    chunk.to_sql(name='company_data', if_exists='append', con=con)