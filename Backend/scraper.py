import requests
from bs4 import BeautifulSoup


def scrape_wikipedia(url: str):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0 Safari/537.36"
        )
    }

    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.find("h1", id="firstHeading").get_text(strip=True)

    content_div = soup.find("div", id="mw-content-text")
    paragraphs = content_div.find_all("p")

    text = " ".join(
        p.get_text(strip=True)
        for p in paragraphs
        if p.get_text(strip=True)
    )

    return title, text
