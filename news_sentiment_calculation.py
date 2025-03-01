from transformers import BertTokenizer, BertForSequenceClassification, pipeline

finbert = BertForSequenceClassification.from_pretrained('yiyanghkust/finbert-tone',num_labels=3)
tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-tone')
nlp = pipeline("text-classification", model=finbert, tokenizer=tokenizer)

count = 0
unique_indices = news_df.index.unique()

# BASICALLY, FOR EACH NEWS PIECE, JUST USE THE nlp(news_string) TO CALCULATE SENTIMENT WHICH WILL HAVE A LABEL AND A CONFIDENCE SCORE. 

for index in unique_indices:
  news = list(news_df.loc[index, "News"].values)
  results = nlp(news) # CALCULATES THE SENTIMENTS
  overall = 0

  # AVERAGES SENTIMENTS FOR A CERTAIN SUBSET OF RESULTS, NOT REALLY NEEDED IMO, BUT FEEL FREE TO REFACTOR IF NEEDED
  for result in results:
    if result['label'] == "Positive": score = 1
    elif result['label'] == "Negative": score = -1
    elif result['label'] == "Neutral": score = 0
    score *= result['score']
    overall += score

  # JUST EXTRA STUFF
  print(overall)
  overall /= len(results)
  print(results)
  # print(overall)
  sentiment_df.loc[index, "Sentiment"] = overall

  if count % 100 == 0: print(count)
  count += 1