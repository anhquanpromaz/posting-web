const BIN = "6ad0cc29ffd5d160536d76d5";
const KEY = "$2a$10$K0bmFOPTonKmkaMNIr96OOZaA4NbuW5AxlAUeaC1.kPtcTSFfioRa";

async function getDB() {
    let res = await fetch(`https://api.jsonbin.io/v3/b/${BIN}/latest`, { headers: { 'X-Master-Key': KEY } });
    let json = await res.json();
    return json.record || {};
}

async function getByNgan(ngan) {
    let db = await getDB();
    return db[ngan] || [];
}
async function AutoUpdate() {
    let titlelist = await getByNgan("Title");
    document.querySelectorAll('.loadedDataAsPage').forEach(item => item.remove());
    FIRST_TITLE.textContent = "Here is all posts owner have posted!"
    for (let i = 0 ; i < titlelist.length ; i ++) {
        const title_item = document.createElement('button');
        title_item.textContent = `${i+1}. ${titlelist[i]}`;
        title_item.className = 'loadedDataAsPage';
        document.body.appendChild(title_item);
        title_item.addEventListener('mouseenter',function() {
            title_item.textContent = "Click to view this post!";
        })
        title_item.addEventListener('mouseleave',function() {
            title_item.textContent = `${i+1}. ${titlelist[i]}`;
        })
        title_item.addEventListener('click',function() {
            window.location.href = `viewonlypost/index.html?id=${i}`
        })
    }
    if (titlelist.length === 0) {
        FIRST_TITLE.textContent = "Oh! The owner haven't share any post yet :P"
    }
}
setInterval(AutoUpdate,3000)
const backBtn = document.createElement('button');
backBtn.id = "backBtn";
backBtn.textContent = "←";
document.body.appendChild(backBtn);
backBtn.addEventListener('click', function() {
    window.location.href = "../index.html"
})