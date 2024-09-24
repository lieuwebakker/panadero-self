# Security Policy

## Supported Versions

Maintaining multiple versions of the library is quite time consuming, so
the majority of the effort is focused on the latest major release.

If you do require a version outside of this chart updated with patch fix,
please [contact me](mailto:github@ricmoo.com).

| Version | Supported                                  | Initial Release   |
| ------- | ------------------------------------------ | ----------------- |
| 0.9.57  | :white_check_mark:                         | 2024-09-24        |
| 0.9.51  | :white_check_mark:                         | 2024-09-14        |
| 0.9.43  | :white_check_mark:                         | 2024-09-14        |
| 0.9.42  | :white_check_mark:                         | 2024-09-13        |
| 0.9.x   | :white_check_mark:                         | 2023-02-02        |
| 0.1.x   | :x:                                        | 2023-02-14        |
| 0.0.x   | :x:                                        | 2023-01-29        |

## Versioning
0.9.42 	+ resolveName
0.9.43 	+ resolveAllNames
0.9.44	+ vue3 / node.js conversion
0.9.45 	+ vue3 / node.js conversion
0.9.46	+ vue3 / node.js conversion
0.9.47 : add totalSupply
0.9.48 : add contract parameters totalSupply(_contract)
0.9.49 : added burner.json to package
0.9.50 : import endPoints from .env
0.9.51 : recover import.meta.env
//      If  using Vite, use import.meta.env instead, process.env is removed.
//      And make sure variables start with VITE_ in .env file.
//  change 0.9.52 : fix endpoint madness network eth or bsc [_network]
//  change 0.9.53 : changed _network for object
//  change 0.9.54 : retrieve endPoint from .env for totalSupply
//  change 0.9.55 : repair 'network="bsc" for native calls
//  change 0.9.56 : included checkSupplyDelta()
//  change 0.9.57 : included createBurnMsg(), idleMsg()
## Reporting a Vulnerability

If you identify a security vulnerability with this library (or any dependency),
please do not hesitate to contact [github@lieuwebakker](mailto:lieuwe@panaderos.nl)
immediately.

I try to respond within the same day and will address any concern as quickly
as possible (including code fixes and publishing to NPM).

Any vulnerability will also be published to this file, along with credits,
pertinent information and links to fixes.