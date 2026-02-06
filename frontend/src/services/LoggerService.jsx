const API_URL = "http://localhost:5194/api/logger"; // Apna port check kar lein

export const sendLog = async (message) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Important: .NET [FromBody] string ke liye JSON.stringify zaroori hai
            body: JSON.stringify(message), 
        });
    } catch (error) {
        console.error("Logging failed:", error);
    }
};