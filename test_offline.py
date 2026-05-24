from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a persistent context to keep the service worker
        context = browser.new_context()
        page = context.new_page()
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))

        # Load the page to install SW and cache
        print("Loading online...")
        page.goto("http://localhost:3000/")
        page.wait_for_timeout(2000)

        # Simulate offline
        print("Going offline...")
        context.set_offline(True)

        # Try to navigate and load data
        page.goto("http://localhost:3000/#learn-vowels")
        page.wait_for_timeout(2000)

        content = page.content()
        if 'అ' in content and 'letter-card' in content:
            print("Vowels loaded offline!")
        else:
            print("Vowels failed to load offline.")

        browser.close()

if __name__ == "__main__":
    run_test()
