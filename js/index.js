async function fetchData(userMessage) {
    const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD_XKFYt-Nln8rhKKSxDaEo3ZsCcvfTmxE";
    const requestData = {
        contents: [
            {
                parts: [{ text: userMessage }],
            },
        ],
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
        const data = await response.json();
        const answer = data.candidates[0].content.parts[0].text;
        return answer;
    } catch (error) {
        console.error("Error", error);
    }
}
document.getElementById("send-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div class="message user"><p>${userInput}</p></div>`;
        document.getElementById("user-input").value = "";

        const response = await fetchData(userInput);
        chatBox.innerHTML += `<div class="message bot"><p>${response}</p></div>`;
    }
});
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("send-button").click();
    }
});