from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        errors = []
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}") if msg.type == 'error' else None)
        page.on("pageerror", lambda err: errors.append(err.message))

        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        # Test routing and new UI
        routes = ["#play-memory", "#play-bubble", "#pronunciation"]
        for route in routes:
            page.goto(f"http://localhost:3000/{route}")
            page.wait_for_timeout(1000)

        browser.close()

        if errors:
            print("ERRORS FOUND:")
            for err in errors:
                print(err)
            exit(1)
        else:
            print("Integration test passed without console errors.")

if __name__ == "__main__":
    run_test()
