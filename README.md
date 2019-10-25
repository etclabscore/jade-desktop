# Jade Service Runner UI

<p align="center">
<img height="256" width="256" src="https://github.com/etclabscore/jade-media-assets/blob/master/jsr-gui/jsr-gui%20(PNG)/256x256.png?raw=true" />
</p>

<center>
  <h3 align="center">Jade Service Runner UI</h3>

  <p align="center">
    A UI app for managing JSON-RPC services.
    <br />
    <a href="https://github.com/etclabscore/jade-service-runner-ui/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/etclabscore/jade-service-runner-ui/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</center>

<!-- table of contents -->
## Table of Contents
  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
      - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Resources](#resources)

<!-- about the project -->
## About The Project
Jade Service Runner UI is an app that bundles [Jade Service Runner](https://github.com/etclabscore/jade-service-runner/) and its interface into an easy to use application for users to install, manage, and discover locally run services.

### Better dApp Development
Service Runner improves the dApp development cycle, by reducing the number of steps required for running services that are local to the user, in addition to  associated with relying on locally running JSON-RPC services. To do this effectively, Jade Service Runner supports the following:
  - Allows dApp developers to specify what services they'd like to use
  - Provides defaults for the services to run
  - Provides users with an easy installation path
  - Provides reliable discovery of pre-existing services run by the service runner
  - Provides OpenRPC interface to the Service Runnner functionality, as well as the underlying services
  - Allows dApp developers the ability to retrieve reliable JSON-RPC connection information from the service
  - Provides typed interfaces to develop applications against

<!-- getting started with the project -->
## Getting Started
### Installation
#### Install via binary
Download and install the latest binary for Windows, MacOS, or Linux [here](https://github.com/etclabscore/jade-service-runner-ui/releases/latest).

<!-- example usage, screen shots, demos -->
## Usage

![service_runner__1](https://user-images.githubusercontent.com/364566/63100364-cc15f200-bf2b-11e9-9698-12e05a8d0bd0.gif)

### Development
- `npm install`
- `npm start`
- `npm run electron`

### Extended services
A away to extend services, see [here](https://github.com/etclabscore/jade-service-runner/#extending-services) for more info.

```
jade-service-runner-ui.app/Contents/MacOS/jade-service-runner-ui -c my-extended-config.json
```

<!-- template just leave alone  -->
## Roadmap
See the [open issues](https://github.com/etclabscore/jade-service-runner-ui/issues) for a list of proposed features (and known issues).

<!-- template just leave alone  -->
## Contributing
How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.

## License
Apache License 2.0

<!-- references and additional resources  -->
## Resources 
- [jade.builders](https://jade.builders/)
- [etclabscore/jade](https://github.com/etclabscore/jade)
- [open-rpc](http://open-rpc.org)