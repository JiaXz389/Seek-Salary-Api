# SeekSalaryApi

A lightweight Node.js tool for **seeking** and aggregating public salary data across multiple sources and bands. Point it at any JSON salary API or CKAN dataset and pull structured data without writing one-off scripts every time.

## Why?

Public salary data lives in a lot of places — CKAN portals (`data.gov.au`, `data.vic.gov.au`), public JSON APIs (levels.fyi, some payscale endpoints), and various government transparency datasets. Pulling it together usually means:

- One-off curl scripts per source
- Manually iterating query params across salary bands or classification levels
- Copy-pasting into spreadsheets to compare

This tool wraps that into a simple UI and a batch-query endpoint.

## Features

- **Single-shot fetch** — paste any JSON endpoint, get structured data back
- **Batch range comparison** — iterate a base URL across multiple salary bands in one call
- **Works with any JSON API** — CKAN DataStore, public salary APIs, internal tooling, whatever returns JSON
- **Zero config** — clone, `npm install`, `npm start`

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/JiaXz389/Seek-Salary-Api.git
cd Seek-Salary-Api
npm install
npm start
```

The app runs at `http://localhost:3000`

## Usage

### Web UI

Open `http://localhost:3000`, paste a JSON endpoint into the input, and hit Submit.

Examples to try:

- `https://data.gov.au/data/api/3/action/package_search?q=salary`
- `https://data.gov.au/data/api/3/action/package_search?q=remuneration`
- Any public salary JSON API

### API Endpoints

#### POST /api/fetch

Fetch JSON from a single URL.

```bash
curl -X POST http://localhost:3000/api/fetch \
  -H "Content-Type: application/json" \
  -d '{"url": "https://data.gov.au/data/api/3/action/package_search?q=salary"}'
```

#### POST /api/calculate-salary

Iterate a base URL across multiple salary bands or ranges. Useful when a source paginates or filters by band and you want everything in one response.

```bash
curl -X POST http://localhost:3000/api/calculate-salary \
  -H "Content-Type: application/json" \
  -d '{
    "baseUrl": "https://example.com/api/salary/range/",
    "salaryRanges": ["50000-70000", "70000-90000", "90000-120000", "120000-150000"]
  }'
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |

## Tech Stack

- Express.js
- Vanilla JS frontend
- cURL under the hood for HTTP

## License

MIT
