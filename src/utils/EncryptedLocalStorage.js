const CryptoJS = require("crypto-js");
const EncryptedLocalStorage = () => {
    return {
        setAppSettings: (settingsObj) => {

            console.log("SET APP SETTINGS");
            if (!settingsObj) {
                throw "Settings cannot be undefined or null";
            }
            localStorage[process.env.APPSETTINGS_ID] = CryptoJS.AES.encrypt(JSON.stringify(settingsObj), process.env.APPSETTINGS_KEY).toString();

        },
        getAppSettings: () => {

            const storedValue = localStorage[process.env.APPSETTINGS_ID];
            if (!storedValue) {
                return { theme: 'cerulean' };
            }
            const bytes = CryptoJS.AES.decrypt(storedValue, process.env.APPSETTINGS_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
    }
}

export default EncryptedLocalStorage;