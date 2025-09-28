# ⏱️ Timer-Based Ludo Game

This project extends a traditional pawn-based board game with **timer rules, score tracking, and capture logic**. It ensures fair gameplay with scoring based on pawn movements, captures, and time-based victory conditions.

---

## 🎮 Game Rules

1. **Immediate Win**:
   - If a player gets **all pawns into the house** before the timer ends, they are declared the **winner instantly**.

2. **Timer Win**:
   - If the **timer runs out**, the **player with the highest score wins**.
   - In case of a tie, the **player with the most captures** among the highest scorers wins.

---

## 🖥️ Backend Implementation

### 🔹 Player & Pawn Model Updates
- Added `pawnScore` in pawns.
- Added `playerScore` and `playerCaptures` in the player model.
- Method to update **player score** based on pawn colors.

### 🔹 Score Updates
- On each pawn move:
  - `pawnScore` is updated by the **number of steps moved** (edge cases handled).
- On capturing another pawn:
  - The captured pawn’s score is **added to the attacker pawn** using `beatPawn()`.
  - After each capture, **player score updates** based on pawn values.

### 🔹 Timer Management
- A **constant game time** is set.
- Defined `gameStartTime` and `gameEndTime` inside the `room` object.
- On game start:
  - `gameEndTime` is set.
  - `timeoutManager` triggers `endGameByTimer()`.
- On timeout:
  - `findWinnerByTimer()` determines the winner.
  - Winner is sent to players via **socket event** `SendWinner`.

---

## 🖼️ Frontend Implementation

- **Gameboard Setup**:
  - Initializes variables like `gameEndTime`, `player`, and passes them to the `Scoreboard` component.

- **Timer Functionality**:
  - Timer updates every second.
  - Timer is displayed in the UI.

- **Score Display**:
  - Directly passes **player score** to components (avoiding unnecessary variable declarations to save space).

---

## 📺 Demo

🎥 Watch the demo on YouTube: [Demo Link Here](https://youtu.be/V_15dLr-dzs)

---
