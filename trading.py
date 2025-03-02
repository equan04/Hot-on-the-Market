import math
import pyautogui

cash = 1000 # USD
n = 1 # trades to be opened

# Fill and submit trade form for Market order
def execute_trade(ticker, direction, shares):
    order_type = 'm' # 'm' for market
    tab(2)
    pyautogui.write(direction) # 'b'/'bb' for Buy/Buy Back, 's'/'ss' for Sell/Short Sell
    tab()
    if direction in ['b', 'ss']:
        pyautogui.write(str(shares)) # Enter number of shares (for opening trade)
    else:
        tab()
        pyautogui.press('enter') # Select all shares (for closing trade)
    tab(2)
    pyautogui.write(order_type)
    if direction == 'b':
        tab(4)
    elif direction == 'ss':
        tab(3)
    elif direction == 's':
        tab(7)
    elif direction == 'bb':
        tab(4)
    pyautogui.press('enter')
    
    if not wait_for('Place order', max_seconds=2):
        print(f'Failed filling form to {direction} {shares} shares of {ticker}')
        return False
    else:
        pyautogui.press('enter') # Execute trade
        if wait_for('Order received', max_seconds=2):
            print(f'Market order placed to {direction} {shares} shares of {ticker}')
            return True
        else:
            print(f'Failed placing order to {direction} {shares} shares of {ticker}')
            return False

# Check all stocks until n stocks have been traded
def open_trades(tickers, directions, to_skip, preset_limits, n):
    m = 0 # Count number of stocks traded
    tickers_traded, directions_traded = [], []

    # Wait for market to open
    while True:
        if premarket_close <= datetime.now(pytz.timezone('US/Eastern')).time():
            break
        
    # Continue cycling through tabs until all trades have been opened. Remove any from consideration as needed
    while m < n:
        for i in range(len(tickers)):
            if datetime.now(pytz.timezone('US/Eastern')).time() < market_close:
                try:
                    ticker = tickers[i % len(tickers)]
                    direction = directions[i % len(directions)]
                    if [ticker, direction] in to_skip:
                        pyautogui.hotkey('command', 'option', 'right')
                        sleep(0.075)
                        continue
                    
                    t = 'Long' if direction == 'b' else 'Short'
                    limits = preset_limits[ticker]
                    limit_price = limits[0 if direction == 'ss' else 1]
                    limit_other = limits[1 if direction == 'ss' else 0]
                    print(f'Checking whether to {t} {ticker} @ {round(limit_price, 2)}')
                    
                    bid, ask = check_spread()
                    if bid and ask:
                        if (direction == 'b' and ask > limit_price) or (direction == 'ss' and bid < limit_price):
                            c = 1/3 * cash if direction == 'ss' else 2/3 * cash
                            shares = max(.1, math.floor(c / limit_price))
                            if execute_trade(ticker, direction, shares):
                                m += 1
                                tickers_traded.append(ticker)
                                directions_traded.append(direction)
                                to_skip.append([ticker, direction])         
                                if m == n:
                                    break
                            else:
                                pyautogui.hotkey('command', 'option', 'right')
                                sleep(0.075)
                                continue
                        else:
                            to_skip.append([ticker, direction])
                            pyautogui.hotkey('command', 'option', 'right')
                            sleep(0.075)
                            continue

                    elif (direction == 'b' and bid < limit_other) or (direction == 'ss' and ask > limit_other):
                        print(f'No longer attempting to {t} {ticker} as opposite limit has been exceeded')
                        to_skip.append([ticker, direction])
                except Exception as e:
                    print(f'Check failed for {ticker} or error: {e}')
                    to_skip.append([ticker, direction])
            else:
                print(f'Waiting for next trading day')

            pyautogui.hotkey('command', 'option', 'right')
            sleep(0.075)

open_trades(tickers, directions, to_skip, preset_limits=init_limits, n=n)