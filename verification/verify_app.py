from playwright.sync_api import sync_playwright

def verify_crypto_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the landing page
        page.goto("http://localhost:3000/crypto")
        page.wait_for_selector('text="Cryptographic Algorithmic Thinking"')

        # Take screenshot of landing page
        page.screenshot(path="verification/landing_page.png")
        print("Landing page screenshot taken.")

        # Navigate to RSA Lesson
        page.click('text="Start RSA Lesson"')
        page.wait_for_selector('text="RSA: Locking with Math"')

        # Interact with RSA
        # Choose Primes (should be default)

        # Click Find d (Wait for it to be enabled/visible if dependent on other actions,
        # but in my code it depends on selecting e)

        # Select an e
        page.click('button:has-text("3")') # Assuming 3 is a valid e

        # Calculate d
        page.click('button:has-text("Calculate d")')

        # Encrypt
        page.click('button:has-text("Encrypt")')

        # Decrypt
        page.click('button:has-text("Decrypt")')

        page.screenshot(path="verification/rsa_lesson.png")
        print("RSA Lesson screenshot taken.")

        # Navigate back and to AES Lesson
        page.goto("http://localhost:3000/crypto")
        page.click('text="Start AES Lesson"')
        page.wait_for_selector('text="AES: Scrambling with Rounds"')

        # Interact with AES
        page.click('button:has-text("1. SubBytes")')
        page.click('button:has-text("2. ShiftRows")')
        page.click('button:has-text("3. MixColumns")')
        page.click('button:has-text("4. AddRoundKey")')

        page.screenshot(path="verification/aes_lesson.png")
        print("AES Lesson screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_crypto_app()
