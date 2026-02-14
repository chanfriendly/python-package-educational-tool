import { Box, Layers, ArrowRight } from 'lucide-react';

export const LEVELS = [
    {
        id: 1,
        title: "Mission: Reshape the Data",
        description: "We have a raw 1D array of 6 elements. The client needs a 2x3 grid structure to fit their blueprint.",
        hint: "Check the dimensions: (Rows, Columns)",
        concept: "Reshape changes the dimensions of your data without changing the data itself. Like rearranging 6 Lego blocks from a line into a rectangle.",

        // Initial State
        initialCount: 6,
        initialShape: [6], // 1D array of 6
        colors: ["#ff453a", "#ff9f0a", "#ffd60a", "#30d158", "#64d2ff", "#bf5af2"],

        // Target State
        targetShape: [2, 3], // 2 rows, 3 cols

        // Options
        options: [
            { label: "Reshape (3, 2)", value: "reshape_3_2", correct: false, error: "Incorrect dimensions. (3, 2) would be 3 rows of 2 columns. We need 2 rows of 3 columns." },
            { label: "Reshape (2, 3)", value: "reshape_2_3", correct: true },
            { label: "Flatten", value: "flatten", correct: false, error: "Flattening makes it 1D again. We need a 2D grid." }
        ]
    },
    {
        id: 2,
        title: "Mission: Broadcast Signal",
        description: "We have a single signal pattern (1 row). We need to broadcast it to cover the entire 3x3 grid.",
        hint: "Broadcasting stretches the smaller array to match the larger one.",
        concept: "Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations. The smaller array is 'broadcast' across the larger array so that they have compatible shapes.",

        // Initial State
        initialCount: 3,
        initialShape: [1, 3], // 1 row, 3 cols
        colors: ["#ff453a", "#30d158", "#0a84ff"], // RGB pattern

        // Target State
        targetShape: [3, 3], // 3 rows, 3 cols

        // Options
        options: [
            { label: "Reshape (3, 1)", value: "reshape_3_1", correct: false, error: "Reshaping just moves the blocks. We need to DUPLICATE them to fill the space." },
            { label: "Broadcast (3, 3)", value: "broadcast_3_3", correct: true },
            { label: "Tile (2, 2)", value: "tile_2_2", correct: false, error: "Tiling 2x2 wouldn't fit the 3x3 target." }
        ]
    }
];
