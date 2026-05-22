import os

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

load_dotenv()

WELCOME_MESSAGE = os.getenv("WELCOME_MESSAGE", "Welcome! Glad to have you here.")

app = App(
    token=os.environ.get("SLACK_BOT_TOKEN"),
    signing_secret=os.environ.get("SLACK_SIGNING_SECRET"),
)


@app.event("app_mention")
def handle_app_mention(event, say):
    user = event.get("user", "there")
    say(f"<@{user}> {WELCOME_MESSAGE}")


if __name__ == "__main__":
    app_token = os.environ.get("SLACK_APP_TOKEN")
    if not app_token:
        raise RuntimeError("SLACK_APP_TOKEN is required for Socket Mode demo")

    handler = SocketModeHandler(app, app_token)
    handler.start()
