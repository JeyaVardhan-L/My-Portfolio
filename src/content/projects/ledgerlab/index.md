---
title: "LedgerLab"
summary: "A blockchain in the browser that you can tamper with, mine and attack, to see exactly why the chain breaks."
date: 2025-10-25
side: software
featured: false
order: 12
tags: ["TypeScript","React","SHA-256","Playwright"]
repo: "https://github.com/JeyaVardhan-L/LedgerLab"
cover: ./cover.png
demo: "https://jeyavardhan-l.github.io/LedgerLab/"
specs:
  - { label: "Hashing", value: "SHA-256" }
  - { label: "Shows", value: "avalanche, proof of work, tampering, 51% attack" }
  - { label: "Tests", value: "20 unit + Playwright E2E" }
---

## Overview

**LedgerLab** is an open-source, interactive browser-based educational laboratory engineered to demystify how decentralized blockchains, cryptographic hashing, and consensus mechanisms work under the hood. 

Instead of treating blockchains as financial instruments or opaque abstractions, LedgerLab provides an interactive state machine where learners can experiment with data structures, tamper with historical blocks, and observe mathematical consequences in real time.

- **Primary Languages**: TypeScript, React
- **Test Suite**: 20 unit tests, Playwright End-to-End verified

---

## The 4-Stage Laboratory Journey

LedgerLab offers structured, numbered interactive experiments:

### 1. Cryptographic Hashes & The Avalanche Effect (Stage 01)
Demonstrates the SHA-256 cryptographic hash function. Users type arbitrary plaintext and observe that the 256-bit hexadecimal digest remains strictly fixed at 64 characters, and changing even a single bit in the input scrambles >50% of the output digest (the cryptographic avalanche effect).

### 2. Block Structure & Proof-of-Work Mining (Stage 02)
Packages payload data with a timestamp, sequential index, and arbitrary integer nonce. Deliberately tampering with payload data causes the block's current hash to diverge from its required difficulty target (e.g., hash prefix matching `0000...`). Users trigger the simulated miner to witness client-side CPU loops searching for a nonce satisfying the difficulty target.

### 3. The Blockchain & Cascading Invalidation (Stage 03)
Chains sequential blocks together where each child block cryptographically embeds the `previous_hash` of its parent. Tampering with historical Block #1 immediately breaks its hash, severing the link to Block #2, which in turn invalidates Block #3, visually demonstrating why blockchain data is immutably anchored through backwards-referential cryptographic hashes.

### 4. Attack, Defense & Distributed Consensus (Stage 04)
Allows users to attempt rewriting history by re-mining invalidated blocks sequentially, demonstrating why computational work makes altering confirmed blocks practically impossible against a distributed network.

---

## Verification & Status

- **Status**: Implemented and verified with both unit test suites and Playwright end-to-end browser tests.
