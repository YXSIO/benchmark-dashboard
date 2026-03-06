# Embedding Benchmark English – Dashboard

A local dashboard that displays model evaluation metrics in a hierarchical table: **Use Case** → **Dataset** → **Metric**, with models as rows.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. **http://localhost:5173**) in your browser.

To serve the production build locally:

```bash
npm run build
npm run preview
```

Then open the preview URL (e.g. http://localhost:4173).

## Data file

The app loads benchmark data from **`public/benchmark-data.json`**. Replace this file to use your own data. The JSON must follow this schema:

- **`models`** – Array of model display names (e.g. `["Stereo", "mGTE Base", ...]`).
- **`useCases`** – Array of use cases. Each has:
  - `id` – Unique id (e.g. `"query-classification"`).
  - `name` – Display name (e.g. `"Query Classification"`).
  - `datasets` – Array of datasets. Each has:
    - `id` – Unique id (e.g. `"agentic"`).
    - `name` – Display name (e.g. `"Agentic Classifier"`).
    - `metrics` – Array of metrics. Each has:
      - `id` – Unique id within the dataset (e.g. `"multi-step"`).
      - `name` – Display name (e.g. `"Multi Step"`).
      - `type` – Optional metric type (e.g. `"AUC"`).
      - `isAverage` – Optional boolean for AVG columns.
- **`values`** – Object mapping each cell to a value. Key format:  
  **`modelId_useCaseId_datasetId_metricId`**  
  where `modelId` is the model name lowercased, spaces and special characters replaced by hyphens (e.g. `qwen3-ebd-0-6b-ft`).  
  Value: numeric string for percentage (e.g. `"92.50"`), `"N/A"`, or `null` (empty).
- **`highlight`** – Optional.
  - `rows` – Array of model ids to highlight the entire row (e.g. `["qwen3-ebd-0-6b-ft"]`).
  - `cells` – Array of value keys to highlight individual cells (e.g. `["qwen3-ebd-0-6b-ft_query-classification_agentic_avg"]`).

TypeScript types for this structure live in **`src/types/benchmark.ts`**.

## Tech stack

- React 18, TypeScript, Vite
- CSS Modules for table styling (dark theme)
