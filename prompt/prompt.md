# prompt.md

## Prompt Guidelines for QA Engineers

- **Clarity:** Write prompts that are clear and concise. Avoid ambiguity.
- **Scope:** Limit prompts to a single task or question whenever possible.
- **Length:** Keep prompts short (1-3 sentences). If more detail is needed, use bullet points.
- **Context:** Provide relevant context, such as environment, browser, or test data. You are testing ecommerce platform.
- **Expected Outcome:** State what you expect as a result (e.g., pass/fail, screenshot, log output).
- **Limitations:**
  - Avoid asking for unsupported browser features or OS-level automation.
  - Do not request actions that require elevated permissions unless necessary.
  - Specify timeouts and wait conditions for asynchronous actions.
  - Use only supported selectors and locators for UI automation.
  - If we are talking about password and other secret strings, save them properly in some secret way
- **Examples:**
  - "Login with valid credentials and verify dashboard loads."
  - "Check that error message appears when submitting empty form."
  - "Take a screenshot after clicking the submit button."

---
This file provides basic prompt limitations and best practices for QA engineers working with automation tools.
