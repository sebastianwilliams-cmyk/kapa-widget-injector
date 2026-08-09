# Kapa Widget Injector

A small personal Chrome extension for live demos. It injects the Kapa AI
widget onto whatever page you're currently on, so you don't need to build
a bespoke demo page just to show the widget off.

## Install

1. Open `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select this folder

## Usage

1. Click the extension icon to open the popup
2. Fill in your Website ID (required) and any optional project settings
3. Click "Inject on this page"
4. The widget script is injected into the current tab

Your settings are remembered (via Chrome's local storage) for next time.

Nothing is sent anywhere except local Chrome storage on your own machine —
the extension only talks to the current tab and to
`widget.kapa.ai` when the widget script loads.

## Config fields

- **Website ID** (required) — your Kapa project's website ID
- **Project name** — optional display name
- **Project color** — optional accent color (hex), e.g. `#FE5102`
- **Project logo URL** — optional logo image URL
- **Open modal by default** — opens the widget modal automatically on inject
