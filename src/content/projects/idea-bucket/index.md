---
title: "Idea Bucket"
summary: "An Android app that records a spoken thought, transcribes it on the phone with Whisper, and turns it into short tasks and notes, merging repeats."
date: 2026-11-25
side: software
featured: false
order: 5
tags: ["TypeScript", "React Native", "Expo", "Whisper", "SQLite"]
repo: "https://github.com/JeyaVardhan-L/idea_bucket"
cover: ./cover.png
specs:
  - { label: "Speech to text", value: "whisper.cpp on the phone (base.en or tiny.en)" }
  - { label: "AI step", value: "any OpenAI-compatible API; sees text, never audio" }
  - { label: "Storage", value: "SQLite on the phone, JSON export" }
  - { label: "Offline", value: "queue with retry and backoff" }
  - { label: "Builds", value: "every push to main ships a signed APK" }
---

Open the app, tap, speak, leave. Recording stops by itself after about 4 seconds
of silence. The phone transcribes the recording itself, then an AI model turns
it into short, clear items: tasks, calls, things to delegate, ideas, things to
learn, things to remember. When the same thought comes back, it is merged into
the existing item (×2, ×3 …) instead of making a duplicate.

## How it works

- **Capture first.** The audio goes to a file on the phone straight away, so a
  thought is never lost, even with no network or if the app is killed. You can
  start recording from the app icon's long-press menu or a home-screen widget.
- **Queue.** Captures wait in a queue and retry with exponential backoff
  (including HTTP 429). The queue runs when the app opens, when the network
  comes back, in the background about every 15 minutes, and on Retry.
- **Items.** Grouped by type, with Today, This week, Recurring and By person
  views, search, and an evening digest notification.
- **Privacy.** The API key lives in Android's encrypted storage. Audio is
  deleted after 7 days by default; audio that hasn't been transcribed yet is
  never deleted.

## Stack

Expo SDK 58 with React Native 0.88 and strict TypeScript, expo-router,
whisper.rn, expo-sqlite, expo-secure-store and zod. The pure logic (prompt, JSON
repair, merge planner, queue state machine, retention, digest) has unit tests,
and CI type-checks, lints, tests and publishes a signed APK as a GitHub release.

To try it, download the APK from the
[latest release](https://github.com/JeyaVardhan-L/idea_bucket/releases/latest)
on an Android phone (64-bit ARM).
