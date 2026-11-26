---
title: "Neural net plays Snake"
summary: "A two-layer neural network in plain NumPy that teaches itself to play Snake with deep Q-learning, with every gradient written by hand."
date: 2026-11-24
side: software
featured: false
order: 3
tags: ["Python", "NumPy", "Deep Q-learning", "Reinforcement learning"]
repo: "https://github.com/JeyaVardhan-L/Neural-netowrk-plays-snake"
demo: "https://jeyavardhan-l.github.io/Neural-netowrk-plays-snake/"
cover: ./cover.png
specs:
  - { label: "Network", value: "11 → 64 → 3, 963 parameters" }
  - { label: "Training", value: "400 games, about 12 s on a laptop CPU" }
  - { label: "Score", value: "mean 26.43 apples over 100 games (best 63)" }
  - { label: "Experiments", value: "18 variants × 5 seeds" }
  - { label: "Tests", value: "42, including a numerical gradient check" }
---

I built this to stop treating neural networks as a black box. There is no
PyTorch or TensorFlow here: the forward pass, the loss, backpropagation and the
Adam optimiser are written by hand in NumPy and checked against numerical
gradients.

The live guide is a build journal of 15 chapters, with interactive figures, an
annotated source reader and the trained network playing in the browser.

## How it works

The snake sees 11 inputs, each 0 or 1: danger ahead, right or left, which way it
is heading, and where the food is. The network turns them into a Q-value for
each move (straight, turn right, turn left). Food is worth +10, a crash −10,
everything else 0.

Training is standard DQN: epsilon-greedy exploration, a replay memory of 100k
moves, and a target network synced every 500 updates.

## What I found

- **The network rediscovered the obvious rule.** A hand-written policy using the
  same 11 inputs (never step into danger, move towards the food) scores 27.45 on
  the same boards. The network scores 26.43 and agrees with it on 93.6% of its
  moves. Random moves score 0.16.
- **The ceiling is the inputs, not the learner.** The 11 inputs can only form
  256 combinations. Across 18 variants and 95 training runs, everything lands
  between 25 and 31. Every evaluation game ends with the snake trapped in a
  pocket of its own body that it cannot see.
- **Two settings really matter:** a discount factor above 0 (with γ = 0, four of
  five seeds learn to circle until they time out) and at least 16 hidden units
  (4 units score 1.2).
- **Replay memory and the target network barely change the final score**, but
  without replay the agent learns about 40 games later.
