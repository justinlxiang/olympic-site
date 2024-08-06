import json
import requests
from bs4 import BeautifulSoup

# URL of the page to scrape
url = 'https://olympics.com/en/paris-2024/venues'

# Send a GET request to the URL
response = requests.get(url)
response.raise_for_status()  # Check if the request was successful

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, 'html.parser')

# Find all the venue cards
venue_cards = soup.find_all('article', {'class': 'CardItem-styles__Wrapper-sc-216dce93-20'})

# Extract the venues and their associated sports
venues = []
for card in venue_cards:
    venue_name = card.find('h3', {'class': 'sc-bdnyFh iUjvAZ card-title text--xs-title'}).text.strip()
    sports = [sport.text.strip() for sport in card.find_all('span', {'class': 'sc-bdnyFh iRoa-dR text--tag'})]
    venues.append({'venue': venue_name, 'sports': sports})

# Save the data to a JSON file
with open('venues.json', 'w') as f:
    json.dump(venues, f, indent=4)

print("Data saved to venues.json")