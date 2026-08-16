<div align="center">
![EN-identity Preview](images/preview.png)
# EN-identity

**Clean dark-red identity registration UI for FiveM / ESX**

**Customized & maintained by ENZO CODE**

[Discord](https://discord.gg/HPEAWNB52w) · GPL-3.0

</div>

---

## About

`EN-identity` is a customized ESX identity registration resource with a dedicated NUI interface. The UI uses a minimal dark-red design and keeps the standard ESX identity flow and compatibility where required.

The resource folder name must stay exactly `EN-identity`. A server-side startup check stops the resource if the folder is renamed.

## Features

- Custom dark-red NUI registration interface
- ENZO CODE startup console banner
- Resource-name validation for `EN-identity`
- First name and last name validation
- Date of birth validation
- Height validation
- Gender selection
- ESX player identity integration
- ESX multichar compatibility
- Character deletion support
- Test command for opening the registration UI

## Requirements

Make sure these resources are installed and started before `EN-identity`:

- `es_extended`
- `esx_skin`
- `oxmysql`

## Installation

1. Download or clone this repository.
2. Put the `EN-identity` folder inside your FiveM resources directory.
3. Do **not** rename the resource folder.
4. Make sure the required ESX resources and `oxmysql` start before it.
5. Add the following line to your `server.cfg`:

```cfg
ensure EN-identity
```

6. Keep the custom NUI mode enabled by using:

```lua
Config.UseDeferrals = false
```

7. Restart the server or start the resource.

## Test Command

To manually open the identity UI for testing, use:

```text
/testidentity
```

From the F8 console you can use:

```text
testidentity
```

The server still validates identity registration, so an already registered player cannot register a second identity through the normal callback.

## Configuration

Main settings are available in `config.lua`, including:

- Locale
- Name length limits
- Minimum and maximum height
- Date format
- Lowest and highest birth year
- Character deletion settings
- Deferral mode

## Resource Name Lock

The resource must be named:

```text
EN-identity
```

If the folder/resource name is changed, the server console prints an ENZO CODE error and stops the incorrectly named resource.

## Project Structure

```text
EN-identity/
├── client/
│   └── main.lua
├── locales/
├── server/
│   └── main.lua
├── web/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── config.lua
├── EN-identity.sql
├── fxmanifest.lua
├── LICENSE
├── NOTICE.md
└── README.md
```

## Support

For updates and support:

**ENZO CODE**  
**Discord:** https://discord.gg/HPEAWNB52w

## License

This project is distributed under the **GNU General Public License v3.0 (GPL-3.0)**. See `LICENSE` for the full license text and `NOTICE.md` for information about this modified release.

---

<div align="center">

**ENZO CODE**

</div>
