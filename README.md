# Slack Demo

This repository contains a minimal Slack demo app that posts a welcome message.

## What it does

- Exposes a tiny HTTP endpoint (`POST /slack/events`) to receive Slack events.
- Handles `app_mention` events.
- Replies with a configurable welcome message.

## Quick start

1. Create and activate a virtualenv.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set environment variables:

```bash
export SLACK_BOT_TOKEN='xoxb-...'
export SLACK_SIGNING_SECRET='...'
export WELCOME_MESSAGE='Welcome to the workspace! 🎉'
```

4. Run:

```bash
python app.py
```

5. In Slack app config, subscribe to events using:

- Request URL: `https://<your-host>/slack/events`
- Bot events: `app_mention`

## Notes

- This is intentionally small for demo purposes.
- Use a tunneling tool (e.g. ngrok/cloudflared) during local development.
