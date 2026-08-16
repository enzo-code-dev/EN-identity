--[[
███████╗███╗   ██╗███████╗ ██████╗      ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝████╗  ██║╚══███╔╝██╔═══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██╔██╗ ██║  ███╔╝ ██║   ██║    ██║     ██║   ██║██║  ██║█████╗
██╔══╝  ██║╚██╗██║ ███╔╝  ██║   ██║    ██║     ██║   ██║██║  ██║██╔══╝
███████╗██║ ╚████║███████╗╚██████╔╝    ╚██████╗╚██████╔╝██████╔╝███████╗
╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝

               DISCORD • https://discord.gg/HPEAWNB52w
]]

Config = {}

Config.Locale = GetConvar('esx:locale', 'en')
Config.EnableCommands = ESX.GetConfig().EnableDebug
Config.UseDeferrals = false
Config.DateFormat = 'DD/MM/YYYY'

Config.MinFirstNameLength = 2
Config.MaxFirstNameLength = 25
Config.MinLastNameLength = 2
Config.MaxLastNameLength = 25

Config.MinHeight = 120
Config.MaxHeight = 220
Config.LowestYear = 1900
Config.HighestYear = 2005

Config.FullCharDelete = true
Config.EnableDebugging = ESX.GetConfig().EnableDebug
