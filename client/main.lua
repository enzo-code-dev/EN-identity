--[[
███████╗███╗   ██╗███████╗ ██████╗      ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝████╗  ██║╚══███╔╝██╔═══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██╔██╗ ██║  ███╔╝ ██║   ██║    ██║     ██║   ██║██║  ██║█████╗
██╔══╝  ██║╚██╗██║ ███╔╝  ██║   ██║    ██║     ██║   ██║██║  ██║██╔══╝
███████╗██║ ╚████║███████╗╚██████╔╝    ╚██████╗╚██████╔╝██████╔╝███████╗
╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝

               DISCORD • https://discord.gg/HPEAWNB52w
]]

local loadingFinished = false
local uiOpen = false

local function closeUi()
    uiOpen = false
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    ClearTimecycleModifier()
    SendNUIMessage({ action = 'close' })
end

local function openUi()
    if uiOpen then return end

    uiOpen = true
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(false)
    SetTimecycleModifier('hud_def_blur')
    SetTimecycleModifierStrength(0.65)

    SendNUIMessage({
        action = 'open',
        settings = {
            minFirstNameLength = Config.MinFirstNameLength,
            maxFirstNameLength = Config.MaxFirstNameLength,
            minLastNameLength = Config.MinLastNameLength,
            maxLastNameLength = Config.MaxLastNameLength,
            minHeight = Config.MinHeight,
            maxHeight = Config.MaxHeight,
            lowestYear = Config.LowestYear,
            highestYear = Config.HighestYear
        }
    })
end

RegisterNetEvent('esx_identity:alreadyRegistered', function()
    while not loadingFinished do
        Wait(100)
    end

    TriggerEvent('esx_skin:playerRegistered')
end)

RegisterNetEvent('esx_identity:setPlayerData', function(data)
    if type(data) ~= 'table' then return end

    ESX.SetPlayerData('name', ('%s %s'):format(data.firstName, data.lastName))
    ESX.SetPlayerData('firstName', data.firstName)
    ESX.SetPlayerData('lastName', data.lastName)
    ESX.SetPlayerData('dateofbirth', data.dateOfBirth)
    ESX.SetPlayerData('sex', data.sex)
    ESX.SetPlayerData('height', data.height)
end)

AddEventHandler('esx:loadingScreenOff', function()
    loadingFinished = true
end)

RegisterCommand('testidentity', function()
    openUi()
end, false)

if Config.UseDeferrals then return end

RegisterNUICallback('submitIdentity', function(data, cb)
    if not uiOpen or type(data) ~= 'table' then
        cb({ ok = false, message = 'Registration is not active.' })
        return
    end

    local identity = {
        firstname = data.firstname,
        lastname = data.lastname,
        dateofbirth = data.dateofbirth,
        height = tonumber(data.height),
        sex = data.sex
    }

    ESX.TriggerServerCallback('esx_identity:registerIdentity', function(success)
        if not success then
            cb({ ok = false })
            return
        end

        closeUi()
        ESX.ShowNotification(_U('thank_you_for_registering'), 'success')

        if not ESX.GetConfig().Multichar then
            TriggerEvent('esx_skin:playerRegistered')
        end

        cb({ ok = true })
    end, identity)
end)

RegisterNetEvent('esx_identity:showRegisterIdentity', function()
    TriggerEvent('esx_skin:resetFirstSpawn')

    if not ESX.PlayerData.dead then
        openUi()
    end
end)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    if uiOpen then closeUi() end
end)
