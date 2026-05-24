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

        # Test routing and js loading
        page.get_by_role("link", name="Tracing Game").click()
        page.wait_for_timeout(1000)

        page.goto("http://localhost:3000/#play-word-builder")
        page.wait_for_timeout(1000)

        browser.close()

        if errors:
            print("ERRORS FOUND:")
            for err in errors:
                print(err)
            exit(1)
        else:
            print("No errors.")

if __name__ == "__main__":
    run_test()
