---
title: "Ten Dots"
summary: "A physics-informed neural network that predicts a damped spring from ten noisy measurements, compared honestly against a plain network and least squares."
date: 2026-11-22
side: software
featured: false
order: 4
tags: ["Python", "PyTorch", "NumPy", "PINN", "JavaScript"]
repo: "https://github.com/JeyaVardhan-L/Physics-informed-neural-network"
demo: "https://jeyavardhan-l.github.io/Physics-informed-neural-network/"
cover: ./cover.png
specs:
  - { label: "Data", value: "10 noisy points in the first 0.3 s" }
  - { label: "PINN error", value: "3.8e-6 median MSE on 0.3–1 s" }
  - { label: "Plain network", value: "1.6 median MSE, same data" }
  - { label: "Least squares", value: "2.6e-6 with the exact formula" }
  - { label: "Seeds", value: "10, each with its own noise and weights" }
---

A weight on a spring is measured ten times in its first 0.3 seconds, with a
little noise. Where is it for the next 0.7?

I train two identical neural networks on those ten dots. One sees only the
dots. The other, the physics-informed one, also has to obey
`m x'' + c x' + k x = 0` at 60 times where nothing was measured. The live guide
has interactive figures, including both networks training in the page.

## How it works

I built it three times: in PyTorch, then in NumPy with every gradient derived
by hand, then in JavaScript for the live figures. The derivatives x' and x''
come from autograd, training runs Adam then L-BFGS, and a separate script
recovers c and k from the dots alone.

## Results

- The PINN's error is about **21,000 times lower** than always answering zero,
  and about 440,000 times lower than the plain network's.
- It is **1.4 times the error of least squares**, which is the best linear
  unbiased method for this data and much faster here. The guide says when a
  PINN is worth it and when it isn't.

## What went wrong

On a spring four times faster, the same setup reports a physics loss near 1e-7
and is still wrong. The network obeys the equation at the points where it is
checked and breaks it between them. Chapter 8 of the guide measures this and
fixes it.
