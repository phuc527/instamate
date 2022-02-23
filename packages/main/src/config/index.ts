const CONFIG = {
    BASE_URL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
    APP_URl: process.env.APP_URl || "http://localhost:3000",
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
    API_KEY_GOOGLE_PLACE:
        process.env.API_KEY_GOOGLE_PLACE ||
        "AIzaSyA4p0S4zmTDH4lmYd77COsXNjILTuSleJc",
} as const;

export default CONFIG;
