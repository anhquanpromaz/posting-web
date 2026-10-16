const loadingText = document.createElement('h1');
loadingText.innerText = "Loading this post..."
document.title = "about:blank"
const binId = "6ad0cc29ffd5d160536d76d5";
const apiKey = "$2a$10$K0bmFOPTonKmkaMNIr96OOZaA4NbuW5AxlAUeaC1.kPtcTSFfioRa";

async function getAllData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result.record;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function takeData(compartment, index) {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result.record[compartment][index];
    } catch (error) {
        console.error("Error:", error);
    }
}
document.body.appendChild(loadingText);
const postId = Number(new URLSearchParams(window.location.search).get('id'));
(async() => {
    let postTitle = await takeData("Title", postId);
    const titleShow = document.createElement('h1');
    document.title = `${postTitle} - Posting web - View post`;
    let postContent = await takeData("Content", postId);
    const contentShow = document.createElement('h2');
    let postDate = await takeData("Date", postId)
    const dateShow = document.createElement('h3')
    if (postTitle === undefined || postContent === undefined) {
        postTitle = "404 Not Found";
        postContent = "Sorry, it's seems the server has crashed or this post was deleted."
        document.title = "💔 Page not found 💔"
        postDate = "It's invisibled..."
    }
    const msgCard = document.createElement('div');
    msgCard.className = "msgCard";
    titleShow.innerText = postTitle;
    contentShow.innerText = postContent;
    dateShow.innerText = postDate;
    msgCard.appendChild(titleShow);
    msgCard.appendChild(contentShow);
    msgCard.appendChild(dateShow);
    document.body.appendChild(msgCard);
    loadingText.remove();
})();
const backBtn = document.createElement('button');
backBtn.id = "backBtn";
backBtn.textContent = "←";
document.body.appendChild(backBtn);
backBtn.addEventListener('click', function() {
    window.location.href = "../index.html"
})