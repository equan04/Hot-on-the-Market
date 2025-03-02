from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Fidelity Login Credentials (Optional - You can enter manually)
FIDELITY_USERNAME = "your_username"
FIDELITY_PASSWORD = "your_password"

# Trade Details
SYMBOL = "AAPL"  # Stock symbol
QUANTITY = "10"  # Number of shares
ORDER_TYPE = "Market"  # Options: Market, Limit, Stop, etc.
ACTION = "Buy"  # Buy or Sell

# Set up the WebDriver (Make sure chromedriver is in your PATH)
driver = webdriver.Chrome()

try:
    # Open the Fidelity trade page
    driver.get("https://digital.fidelity.com/ftgw/digital/trade-equity/index/orderEntry")
    time.sleep(3)  # Wait for page to load

    # Login (if not already logged in)
    if "login" in driver.current_url.lower():
        username_box = driver.find_element(By.ID, "userId-input")
        password_box = driver.find_element(By.ID, "password")

        username_box.send_keys(FIDELITY_USERNAME)
        password_box.send_keys(FIDELITY_PASSWORD)
        password_box.send_keys(Keys.RETURN)
        
        time.sleep(5)  # Allow time for login
    
    # Fill out the trade form
    symbol_box = driver.find_element(By.ID, "symbol-search-input")
    symbol_box.send_keys(SYMBOL)
    time.sleep(2)  # Wait for Fidelity to validate the symbol

    quantity_box = driver.find_element(By.ID, "eq-quantity")
    quantity_box.send_keys(QUANTITY)

    order_type_dropdown = driver.find_element(By.ID, "eq-order-type")
    order_type_dropdown.send_keys(ORDER_TYPE)

    action_dropdown = driver.find_element(By.ID, "eq-action")
    action_dropdown.send_keys(ACTION)

    print("Order form filled out. Manually review and submit.")

    # Optional: Uncomment to auto-click "Preview Order"
    # preview_button = driver.find_element(By.ID, "preview-order-button")
    # preview_button.click()

    # Pause for manual review
    time.sleep(15)

finally:
    driver.quit()  # Close the browser