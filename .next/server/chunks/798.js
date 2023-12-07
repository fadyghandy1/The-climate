"use strict";
exports.id = 798;
exports.ids = [798];
exports.modules = {

/***/ 178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ contexts_TimeZoneContext),
  "T": () => (/* binding */ useTimeZoneData)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./utils/getCurrentTime.js
function getCurrentTime(tz) {
    const dateConstructor = new Date();
    const time = dateConstructor.toLocaleTimeString("en-US", {
        timeZone: tz,
        timeStyle: "medium"
    });
    const date = dateConstructor.toLocaleDateString("en-US", {
        timeZone: tz
    });
    return {
        time,
        date
    };
}

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./hooks/TimeZone.js


const useTimeZone = ()=>{
    const [timeZone, setTimeZone] = (0,external_react_.useState)({
        time: null,
        date: null,
        timeZoneId: null
    });
    (0,external_react_.useEffect)(()=>{
        if (!timeZone.timeZoneId) setTimeZone((pre)=>({
                ...pre,
                timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
            }));
        const timerId = setInterval(()=>{
            const zone = getCurrentTime(timeZone.timeZoneId);
            setTimeZone((pre)=>({
                    ...pre,
                    ...zone
                }));
        }, 1000);
        return ()=>{
            clearInterval(timerId);
        };
    }, [
        timeZone.timeZoneId
    ]);
    return {
        timeZone,
        setTimeZone
    };
};
/* harmony default export */ const TimeZone = (useTimeZone);

;// CONCATENATED MODULE: ./contexts/TimeZoneContext.js



const TimeZoneContext = /*#__PURE__*/ (0,external_react_.createContext)();
const useTimeZoneData = ()=>{
    return (0,external_react_.useContext)(TimeZoneContext);
};
function TimeZoneProvider({ children  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(TimeZoneContext.Provider, {
        value: TimeZone(),
        children: children
    });
}
/* harmony default export */ const contexts_TimeZoneContext = (TimeZoneProvider);


/***/ }),

/***/ 600:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ contexts_WeatherContext),
  "y": () => (/* binding */ useWeatherData)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./utils/initData.js + 2 modules
var initData = __webpack_require__(431);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./hooks/WeatherData.js


const INIT_DATA = {
    country: "",
    lon: 0,
    lat: 0,
    currentAside: {},
    dayAside: {
        day: [],
        astro: []
    },
    hours: []
};
const useWeather = ()=>{
    const [weatherData, setWeatherData] = (0,external_react_.useState)(INIT_DATA);
    (0,external_react_.useEffect)(()=>{
        ;
        (async ()=>{
            const data = await (0,initData/* default */.Z)();
            console.log(data);
            if (data) {
                setWeatherData(data);
            }
        })();
    }, []);
    return {
        weatherData,
        setWeatherData
    };
};
/* harmony default export */ const WeatherData = (useWeather);

;// CONCATENATED MODULE: ./contexts/WeatherContext.js



const WeatherContext = /*#__PURE__*/ (0,external_react_.createContext)();
const useWeatherData = ()=>{
    return (0,external_react_.useContext)(WeatherContext);
};
function WeatherProvider({ children  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(WeatherContext.Provider, {
        value: WeatherData(),
        children: children
    });
}
/* harmony default export */ const contexts_WeatherContext = (WeatherProvider);


/***/ }),

/***/ 431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ initData)
});

;// CONCATENATED MODULE: ./utils/getCurrentWeather.js
async function getCurrentWeather(lon, lat) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e34841c605548b6aa324553222407&q=${lat},${lon}&days=1&aqi=no&alerts=no`);
        if (response.status !== 200) return false;
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

;// CONCATENATED MODULE: ./utils/getGeolocations.js
async function getGeolocations() {
    // if (!console.log(process.env.IP_KEY)) {
    //   throw new Error('there is no API key')
    // }
    try {
        const response = await fetch(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_IP_KEY}`);
        if (response.status !== 200) return false;
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

;// CONCATENATED MODULE: ./utils/initData.js


async function initData() {
    try {
        const geolocations = await getGeolocations();
        const weatherData = await getCurrentWeather(geolocations.location.longitude, geolocations.location.latitude);
        if (geolocations && weatherData) return {
            country: geolocations.location.country.name,
            lon: geolocations.location.longitude,
            lat: geolocations.location.latitude,
            currentAside: weatherData.current,
            dayAside: {
                day: weatherData.forecast.forecastday[0].day,
                astro: weatherData.forecast.forecastday[0].astro
            },
            hours: weatherData.forecast.forecastday[0].hour
        };
        console.log(geolocations && weatherData);
    } catch (error) {
        return false;
    }
}


/***/ })

};
;