import pandas as pd
import datetime
import matplotlib.pyplot as plt
import time
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from dateutil import parser
from transformers import BertTokenizer, BertForSequenceClassification, pipeline
import torch
import csv

class StockNews:
    def __init__(self):
        # Initialize FinBERT model for financial sentiment analysis
        print("Loading FinBERT model...")
        self.finbert = BertForSequenceClassification.from_pretrained('yiyanghkust/finbert-tone', num_labels=3)
        self.tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-tone')
        self.nlp = pipeline("text-classification", model=self.finbert, tokenizer=self.tokenizer)
        print("FinBERT model loaded successfully")
        
    def get_news_articles(self, ticker, days):
        """
        Fetch news articles for a given stock ticker from FinViz
        
        Args:
            ticker (str): Stock ticker symbol (e.g., 'AAPL')
            days (int): Number of days to look back for articles
            
        Returns:
            list: List of dictionaries containing article details
        """

        # Calculate the date threshold for filtering
        threshold_date = datetime.datetime.now() - datetime.timedelta(days=days)
        
        # FinViz scraping
        req = Request(
            url=f'https://finviz.com/quote.ashx?t='+ticker,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        
        try:
            webpage = urlopen(req).read()
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            return []
            
        html = BeautifulSoup(webpage, 'html.parser')
        html_table = html.find(id='news-table')
        
        if not html_table:
            print(f"No news table found for {ticker}")
            return []
            
        rows = html_table.find_all('tr')
        
        articles = []
        current_date = None
        
        for i, table_row in enumerate(rows):
            try:
                # Get the headline
                headline = table_row.a.get_text().strip()
                
                # Get the date/time text
                date_time_text = table_row.td.get_text().strip()
                
                # Extract the URL
                url = table_row.a['href']
                
                # Extract the news source
                # The source is typically in a <div> with class "news-link-right"
                source_div = table_row.find('div', {'class': 'news-link-right'})
                if source_div:
                    source = source_div.text.strip()
                else:
                    # If we can't find the source div, try to extract from the URL domain
                    try:
                        from urllib.parse import urlparse
                        domain = urlparse(url).netloc
                        # Remove www. if present and get the base domain
                        if domain.startswith('www.'):
                            domain = domain[4:]
                    except:
                        source = "FinViz"

                # Parse the date
                # FinViz format is either "MMM-DD-YY HH:MM(AM/PM)" or just "HH:MM(AM/PM)"
                if ' ' in date_time_text and ':' in date_time_text:
                    # Contains both date and time
                    date_part, time_part = date_time_text.split(' ', 1)
                    current_date = date_part
                else:
                    # Contains only time, use the previously stored date
                    time_part = date_time_text
                
                if current_date:
                    # Convert the date string to a datetime object
                    article_date = parser.parse(current_date)
                    
                    # Only include articles within the specified time range
                    if article_date >= threshold_date:
                        articles.append({
                            "title": headline,
                            "url": url,
                            "date": article_date.strftime('%Y-%m-%d'),
                            "source": source
                        })
            except Exception as e:
                continue     
        return articles
    
    def analyze_sentiment(self, articles):
        """
        Analyze sentiment of each article using FinBERT
        
        Args:
            articles (list): List of article dictionaries
            
        Returns:
            pd.DataFrame: DataFrame with articles and sentiment scores
        """
        results = []
        
        for article in articles:
            # Use title for sentiment analysis
            text = article['title']
            
            # Get sentiment prediction from FinBERT
            try:
                # Get sentiment from FinBERT
                prediction = self.nlp(text)[0]
                
                label = prediction['label']
                confidence = prediction['score']
                
                # Convert label to numerical sentiment score
                if label == "Positive":
                    sentiment_value = confidence
                elif label == "Negative":
                    sentiment_value = -confidence
                else:
                    sentiment_value = 0
                
                # Add to results
                article_with_sentiment = article.copy()
                article_with_sentiment['sentiment_label'] = label
                article_with_sentiment['confidence'] = confidence
                article_with_sentiment['sentiment_score'] = sentiment_value
                
                results.append(article_with_sentiment)
            except Exception as e:
                print(f"Error analyzing sentiment for '{text}': {e}")
        
        # Convert to DataFrame for easier analysis
        if results:
            return pd.DataFrame(results)
        else:
            return pd.DataFrame()
    
    def get_positive_percentage(self, ticker, days=30):
        """
        Get the percentage of positive news articles for a ticker
        
        Args:
            ticker (str): Stock ticker symbol (e.g., 'AAPL')
            days (int): Number of days to look back for articles
            
        Returns:
            float: Percentage of positive articles
        """
        articles = self.get_news_articles(ticker, days)
        if not articles:
            return 0.0
            
        df = self.analyze_sentiment(articles)
        if df.empty:
            return 0.0
            
        positive_count = len(df[df['sentiment_label'] == 'Positive'])
        total_count = len(df)
        
        return round((positive_count / total_count) * 100, 1)
    
    def get_negative_percentage(self, ticker, days=30):
        """
        Get the percentage of negative news articles for a ticker
        
        Args:
            ticker (str): Stock ticker symbol (e.g., 'AAPL')
            days (int): Number of days to look back for articles
            
        Returns:
            float: Percentage of negative articles
        """
        articles = self.get_news_articles(ticker, days)
        if not articles:
            return 0.0
            
        df = self.analyze_sentiment(articles)
        if df.empty:
            return 0.0
            
        negative_count = len(df[df['sentiment_label'] == 'Negative'])
        total_count = len(df)
        
        return round((negative_count / total_count) * 100, 1)
    
    def get_neutral_percentage(self, ticker, days=30):
        """
        Get the percentage of neutral news articles for a ticker
        
        Args:
            ticker (str): Stock ticker symbol (e.g., 'AAPL')
            days (int): Number of days to look back for articles
            
        Returns:
            float: Percentage of neutral articles
        """
        articles = self.get_news_articles(ticker, days)
        if not articles:
            return 0.0
            
        df = self.analyze_sentiment(articles)
        if df.empty:
            return 0.0
            
        neutral_count = len(df[df['sentiment_label'] == 'Neutral'])
        total_count = len(df)
        
        return round((neutral_count / total_count) * 100, 1)

    def get_most_positive_article(self, df):
        """Return the article with the highest positive sentiment score"""
        if df.empty:
            return None
        return df.loc[df['sentiment_score'].idxmax()].to_dict()
    
    def get_most_negative_article(self, df):
        """Return the article with the lowest negative sentiment score"""
        if df.empty:
            return None
        return df.loc[df['sentiment_score'].idxmin()].to_dict()
    
    def get_neutral_article(self, df):
        if df.empty:
            return None
        df['abs_sentiment'] = df['sentiment_score'].abs()
        return df.loc[df['abs_sentiment'].idxmin()].to_dict()
    
    def analyze_stock_news(self, ticker, days=30, plot=True):
        """
        Complete analysis pipeline for a stock
        
        Args:
            ticker (str): Stock ticker symbol
            days (int): Number of days to look back
            plot (bool): Whether to display a plot of sentiment distribution
            
        Returns:
            dict: Analysis results including most positive/negative articles
                 and sentiment distribution
        """
        print(f"Analyzing news for {ticker}...")
        
        # Fetch articles
        articles = self.get_news_articles(ticker, days)
        
        if not articles:
            print(f"No articles found for {ticker} in the last {days} days")
            return {
                'most_positive_article': None,
                'most_negative_article': None,
                'sentiment_distribution': {'positive': 0, 'negative': 0},
                'all_articles': []
            }
        
        print(f"Found {len(articles)} articles for {ticker}")
        
        # Analyze sentiment
        df = self.analyze_sentiment(articles)
        
        # Get most positive and negative articles
        most_positive = self.get_most_positive_article(df)
        most_negative = self.get_most_negative_article(df)
        neutral = self.get_neutral_article(df)
        
        # Get sentiment distribution
        positive_percentage = self.get_positive_percentage(ticker, days)
        negative_percentage = self.get_negative_percentage(ticker, days)
        neutral_percentage = self.get_neutral_percentage(ticker, days)
        
        # Return results
        return {
            'name' : ticker,
            'most_positive_article': most_positive,
            'most_negative_article': most_negative,
            'neutral_article' : neutral,
            'positive_percentage': positive_percentage,
            'negative_percentage': negative_percentage,
            'neutral_percentage' : neutral_percentage,
            'article count' : len(articles)
            # 'all_articles': df.to_dict('records')
        }

    def to_csv(self, tickers=None):
        """
        Analyze multiple stocks and save results to CSV
        
        Args:
            tickers (list): List of ticker symbols to analyze. If None, uses default list.
            
        Returns:
            str: Path to the saved CSV file
        """
        tickers = ['AAPL', 'COF', 'AMZN', 'ABNB', 'RDDT', 'WBA', 'NFLX', 'TSLA', 'COST', 'MCD', 'DUOL']
        data = []
        
        for ticker in tickers:
            try:
                result = self.analyze_stock_news(ticker)
                data.append(result)
            except Exception as e:
                print(f"Error analyzing {ticker}: {e}")
        
        filename = 'news.csv'
        
        try:
            # Convert to DataFrame for easier CSV writing
            df = pd.DataFrame(data)
            
            # Handle nested dictionaries (most_positive_article and most_negative_article)
            for idx, row in df.iterrows():
                if row['most_positive_article']:
                    df.at[idx, 'most_positive_title'] = row['most_positive_article'].get('title', '')
                    df.at[idx, 'most_positive_score'] = row['most_positive_article'].get('sentiment_score', 0)
                    df.at[idx, 'most_positive_url'] = row['most_positive_article'].get('url', '')
                    df.at[idx, 'most_positive_date'] = row['most_positive_article'].get('date', '')
                    df.at[idx, 'most_positive_source'] = row['most_positive_article'].get('source', '')
                
                if row['most_negative_article']:
                    df.at[idx, 'most_negative_title'] = row['most_negative_article'].get('title', '')
                    df.at[idx, 'most_negative_score'] = row['most_negative_article'].get('sentiment_score', 0)
                    df.at[idx, 'most_negative_url'] = row['most_negative_article'].get('url', '')
                    df.at[idx, 'most_negative_date'] = row['most_negative_article'].get('date', '')
                    df.at[idx, 'most_negative_source'] = row['most_negative_article'].get('source', '')
                
                if row['neutral_article']:
                    df.at[idx, 'neutral_title'] = row['neutral_article'].get('title', '')
                    df.at[idx, 'neutral_score'] = row['neutral_article'].get('sentiment_score', 0)
                    df.at[idx, 'neutral_url'] = row['neutral_article'].get('url', '')
                    df.at[idx, 'neutral_date'] = row['neutral_article'].get('date', '')
                    df.at[idx, 'neutral_source'] = row['neutral_article'].get('source', '')
            
            # Drop the complex columns
            df = df.drop(['most_positive_article', 'most_negative_article', 'neutral_article'], axis=1)
            
            # Save to CSV
            df.to_csv(filename, index=False)
            print(f"Results saved to {filename}")
            return filename
        except Exception as e:
            print(f"Error saving to CSV: {e}")
            return None

# def test_stock_news():
#     # Create an instance of StockNews
#     news = StockNews()
    
#     # Test with a single stock first
#     test_ticker = 'AAPL'
#     print(f"\nTesting with a single stock: {test_ticker}")
    
#     # Get articles
#     articles = news.get_news_articles(test_ticker, days=7)
#     if articles:
#         print(f"Found {len(articles)} articles for {test_ticker}")
#         # Print first article details
#         if len(articles) > 0:
#             print(f"First article: {articles[0]['title']}")
#     else:
#         print(f"No articles found for {test_ticker}")
    
#     # Test full analysis
#     result = news.analyze_stock_news(test_ticker)
#     print(f"\nAnalysis results for {test_ticker}:")
#     print(f"Positive: {result['positive_percentage']}%")
#     print(f"Negative: {result['negative_percentage']}%")
    
#     # Test CSV export with fewer tickers for quicker testing
#     test_tickers = ['AAPL', 'MSFT', 'AMZN']
#     print(f"\nTesting CSV export with tickers: {', '.join(test_tickers)}")
#     csv_file = news.to_csv(test_tickers)
    
#     if csv_file:
#         print(f"CSV file created successfully: {csv_file}")
#     else:
#         print("Failed to create CSV file")


if __name__ == "__main__":
    obj = StockNews();
    obj.to_csv()
