# The Python Physical Lab

An interactive learning sandbox designed to teach the conceptual "mental models" of Python packages (NumPy, Pandas, Matplotlib, Inspect) using visual metaphors.

## Current Module: NumPy Lego Factory
**Visual Metaphor:** Data arrays as Lego blocks.
**Mode:** Reverse Engineering (The Puzzle).

### Features
- **3D Visualization:** Interactive 3D view of array shapes using React Three Fiber.
- **Puzzle Logic:** Users must select the correct NumPy operation (e.g., `.reshape()`) to match the target configuration.
- **Sleek UI:** Modern, dark-mode interface with smooth animations.

## Tech Stack
- **Frontend:** React + Vite
- **3D Engine:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** Framer Motion
- **Styling:** Vanilla CSS (CSS Modules / Global Variables)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the local URL (usually `http://localhost:5173`).
