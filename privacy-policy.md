---
title: Nalumi Privacy Policy
---

# Nalumi Privacy Policy

**Effective date: November 24, 2026**

Nalumi ("the app") is an Android chat client for large language model (LLM) servers that you run or choose yourself. This policy explains what happens to your data when you use it.

## What Nalumi does

Nalumi lets you chat with AI models served by **your own servers** — self-hosted LLM backends such as Ollama, vLLM, LM Studio, llama.cpp, or LiteLLM. You configure the server address; the app talks to it directly from your device.

## Data we collect: none

The developer of Nalumi **does not collect, transmit, receive, store, or share any of your data**. Specifically:

- No analytics or telemetry
- No advertising or ad SDKs
- No accounts, sign-ins, or identifiers
- No crash reporting services
- No data is sent to any server controlled by the developer

## Where your data goes

**Your messages stay on your device.** Conversations, server profiles, and settings are stored in the app's local database on your phone. They never leave your device except as described below.

**Messages are sent to the server you configure.** When you send a chat message, its content (and any attached images) is transmitted **directly from your device to the LLM server address you entered**. That server is operated by you or a third party you chose — the developer has no access to it and never sees this traffic.

**Network security note:** the app allows plain HTTP connections so you can use servers on your local network (for example, an Ollama instance at `http://192.168.x.x`). Traffic to an `http://` server is not encrypted in transit. Use `https://` server addresses if you connect over untrusted networks.

## Payments (optional tips)

Nalumi is free. If you choose to leave an optional tip, the payment is processed entirely by **Google Play**. The developer never sees your payment method, billing details, or identity; the app only receives an opaque purchase token to show a thank-you. Tips are not linked to your conversations, settings, or server profiles in any way.

## Android backups

Nalumi allows Android's system backup feature. If you have device backup enabled, Android may copy the app's local database (which includes your conversations and server settings, including any API keys you stored in profiles) to your own Google account's backup storage. This is controlled by your device's backup settings, not by the app or the developer.

## Deleting your data

All app data lives on your device. To delete everything: uninstall the app, or use Android Settings → Apps → Nalumi → **Clear data** / **Clear storage**.

## Permissions

The app requests the **Internet** permission solely to communicate with the LLM server you configure, and (on Android 13+) media/image access solely to attach images you explicitly choose to messages.

## Children

Nalumi is not directed at children under 13 and collects no data from any user of any age.

## Changes

If this policy changes, the updated version will be published at this address with a new effective date.

## Contact

Questions about this policy: **saveeco888@gmail.com**

---
*Nalumi is developed by wde.dev.*
