---
children_hash: a01df54786a57eee68616e4e1ff8ad24c0723358c5d4ba4adc7843598162bc61
compression_ratio: 0.26785714285714285
condensation_order: 1
covers: [temperature_simulator_component.md]
covers_token_total: 672
summary_level: d1
token_count: 180
type: summary
---
The `ui_components` domain features interactive modules for visualizing core LLM concepts. A key component is the **Temperature Simulator** (`temperature_simulator_component.md`), an interactive React component located at `src/components/TemperatureSimulator.tsx`.

This component provides a user interface to simulate and visualize how the "temperature" parameter affects token probability distribution in language models. Users can input a prompt, adjust a temperature slider, and observe real-time changes in token probabilities through a table and a bar chart. The component relies on the `useTemperature` hook for its state management and logic, and uses the `recharts` library for rendering the probability chart.