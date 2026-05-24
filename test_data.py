from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        page.goto("http://localhost:3000/#learn-vowels")
        page.wait_for_timeout(2000)

        # Check if letters are loaded
        content = page.content()
        if 'అ' in content and 'letter-card' in content:
            print("Vowels loaded.")
        else:
            print("Vowels not loaded correctly.")

        page.goto("http://localhost:3000/#learn-consonants")
        page.wait_for_timeout(2000)
        content = page.content()
        if 'క' in content and 'letter-card' in content:
            print("Consonants loaded.")
        else:
            print("Consonants not loaded correctly.")

        browser.close()

if __name__ == "__main__":
    run_test()
