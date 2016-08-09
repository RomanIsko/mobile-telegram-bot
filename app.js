// set up Telegram bot
var TelegramBot = require('node-telegram-bot-api');
var botToken    = process.env.MOB_TG_TOKEN;
var bot         = new TelegramBot(botToken, {polling: true});

// set up fonoAPI 
var fonoapi   = require('fonoapi-nodejs');
var fonoToken = process.env.MOB_API_TOKEN;
fonoapi.token = fonoToken;


var devices;

bot.onText(/\/device$/, function (msg) {
    var fromId = msg.chat.id;
    bot.sendMessage(fromId, "Please specify search criteria, e.g. /device nokia e51");
});

bot.onText(/\/device (.+)/, function (msg, match) {
    var fromId = msg.chat.id;
    var query  = match[1];
    var result = '';
    fonoapi.getDevices(myCallback, query);

    function myCallback(queryString, data) {
        devices = data;
        for (var i = 0; i < data.length; i++) {
            result += '/' + (i + 1) + '. ' + data[i].DeviceName + '\n';
        }
        if (result != '') {
            bot.sendMessage(fromId, result);
        }
    }
});

bot.onText(/\/\d+$/, function (msg, match) {
    var id     = match[0].replace('/', '');
    var fromId = msg.chat.id;
    var device = devices[id - 1];

    if (device != null) {
        var info = '';

        var deviceData = new Map();

        deviceData.set('Device Name', device.DeviceName);
        deviceData.set('Brand', device.Brand);
        deviceData.set('Technology', device.technology);
        deviceData.set('2G Bands', device._2g_bands);
        deviceData.set('GPRS', device.gprs);
        deviceData.set('EDGE', device.edge);
        deviceData.set('Announced', device.announced);
        deviceData.set('Status', device.status);
        deviceData.set('Dimensions', device.dimensions);
        deviceData.set('Weight', device.weight);
        deviceData.set('Sim', device.sim);
        deviceData.set('Display Type', device.type);
        deviceData.set('Size', device.size);
        deviceData.set('Resolution', device.resolution);
        deviceData.set('Card Slot', device.card_slot);
        deviceData.set('Phonebook', device.phonebook);
        deviceData.set('Call Records', device.call_records);
        deviceData.set('Camera', device.camera_c);
        deviceData.set('Alert Types', device.alert_types);
        deviceData.set('Loudspeaker', device.loudspeaker_);
        deviceData.set('3.5mm Jack', device._3_5mm_jack_);
        deviceData.set('Sound Quality', device.sound_c);
        deviceData.set('WLAN', device.wlan);
        deviceData.set('Bluetooth', device.bluetooth);
        deviceData.set('GPS', device.gps);
        deviceData.set('Infrared Port', device.infrared_port);
        deviceData.set('Radio', device.radio);
        deviceData.set('USB', device.usb);
        deviceData.set('Messaging', device.messaging);
        deviceData.set('Browser', device.browser);
        deviceData.set('Clock', device.clock);
        deviceData.set('Alarm', device.alarm);
        deviceData.set('Games', device.games);
        deviceData.set('Language', device.languages);
        deviceData.set('Java', device.java);
        deviceData.set('Additional Features', device.features_c);
        deviceData.set('Battery', device.battery_c);
        deviceData.set('StandBy Time', device.stand_by);
        deviceData.set('Talk Time', device.talk_time);
        deviceData.set('Available Colors', device.colors);
        deviceData.set('sensors', device.sensors);
        deviceData.set('CPU', device.cpu);
        deviceData.set('Memory + RAM', device.internal);
        deviceData.set('OS', device.os);
        deviceData.set('Body Features', device.body_c);
        deviceData.set('keyboard', device.keyboard);
        deviceData.set('Primary Camera', device.primary_);
        deviceData.set('Video', device.video);
        deviceData.set('Secondary Camers', device.secondary);
        deviceData.set('3G Bands', device._3g_bands);
        deviceData.set('Speed', device.speed);
        deviceData.set('Network', device.network_c);
        deviceData.set('Chipset', device.chipset);
        deviceData.set('Additional Features', device.features);
        deviceData.set('Music Play', device.music_play);
        deviceData.set('Protection', device.protection);
        deviceData.set('GPU', device.gpu);
        deviceData.set('Multitouch', device.multitouch);
        deviceData.set('Loudspeaker', device.loudspeaker);
        deviceData.set('Audio Quality', device.audio_quality);
        deviceData.set('NFC', device.nfc);
        deviceData.set('Camera', device.camera);
        deviceData.set('Display', device.display);
        deviceData.set('Battery Life', device.battery_life);
        deviceData.set('4G Bands', device._4g_bands);

        deviceData.forEach(function (value, key) {
            if (value != undefined) {
                info += key + ' - ' + value + '\n';
            }
        });

        bot.sendMessage(fromId, info);
    } else {
        bot.sendMessage(fromId, "Please use command /device first, e.g. /device nokia e51");
    }
});
