# ResoBox UI

[![Version](https://img.shields.io/badge/Version-0.1.0-blue.svg)](package.json)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6.svg?logo=typescript&logoColor=white)](package.json)
[![UI Framework](https://img.shields.io/badge/UI-Ant%20Design-0170FE.svg?logo=antdesign&logoColor=white)](package.json)
[![Hardware](https://img.shields.io/badge/Hardware-Raspberry%20Pi%20%2B%20HiFiBerry-C51A4A.svg?logo=raspberrypi&logoColor=white)](https://github.com/resonaura/resobox-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor%20on%20GitHub-EA4AAA?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/resonaura)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/resonaura)

**ResoBox UI** is the companion web dashboard and graphical interface designed for **ResoBox**, a custom standalone guitar pedalboard appliance. It provides real-time control, live signal telemetry, and intuitive pedal chain configuration from any browser, tablet, or onboard touchscreen.

<p align="center">
  <img src="https://raw.githubusercontent.com/resonaura/resobox-ui/main/media/resobox-ui.jpg" width="800" alt="ResoBox DSP UI Control Surface" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/resonaura/resobox-ui/main/media/resobox-hardware.jpg" width="800" alt="ResoBox Hardware Prototype" />
</p>

---

## 🛠️ Features & Integration

- **Live WebSocket Telemetry**: Establishes a low-latency WebSocket connection (`ws://<ip>:8765`) with the Python DSP daemon (`resobox-core`), rendering live input/output RMS levels and active plugin status in real time.
- **Dynamic FX Chain Management**: Inspect and adjust pedalboard effects parameters (drive gain, delay feedback, impulse responses, filter cutoffs, and dry/wet blend) on the fly.
- **Responsive Touch-First Layout**: Built with React 18, TypeScript, and Ant Design, tailored for both desktop browsers and small touchscreens attached directly to the pedalboard rig.
- **REST State Synchronization**: Dispatches preset mutations and effect toggles via lightweight HTTP endpoints.

---

## 📂 Project Structure

```
resobox-ui/
├── src/
│   ├── components/      # UI widgets, sliders, rotary knobs, and VU meters
│   ├── hooks/           # WebSocket connection and telemetry subscription hooks
│   ├── services/        # REST API client for resobox-core
│   ├── types/           # DSP plugin and telemetry TypeScript definitions
│   ├── App.tsx          # Root pedalboard canvas and routing view
│   └── index.tsx        # React DOM entrypoint
├── public/              # Static assets and icons
├── media/               # Interface and hardware screenshots
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm / pnpm
- [resobox-core](https://github.com/resonaura/resobox-core) running on the local network or Raspberry Pi

### Development

```bash
# Install dependencies
npm install

# Configure backend host (defaults to localhost:8765 / localhost:8080)
cp .env.example .env

# Start dev server
npm start
```

### Production Build

```bash
# Compile optimized static bundle
npm run build
```

The production assets can be served directly by `resobox-core`'s integrated web server or any lightweight HTTP daemon (e.g. Nginx, Caddy) on Alpine Linux.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
