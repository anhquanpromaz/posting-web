function showMessage(classname,text) {
    const message = document.createElement('p');
    message.textContent = text;
    message.className = classname;
    document.body.appendChild(message);
    setTimeout(function () {
        message.remove();
    }, 3000);
}
const BIN = "6ad0cc29ffd5d160536d76d5";
const KEY = "$2a$10$K0bmFOPTonKmkaMNIr96OOZaA4NbuW5AxlAUeaC1.kPtcTSFfioRa";

async function getDB() {
    let res = await fetch(`https://api.jsonbin.io/v3/b/${BIN}/latest`, { headers: { 'X-Master-Key': KEY } });
    let json = await res.json();
    return json.record || {};
}

async function saveDB(data) {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': KEY },
        body: JSON.stringify(data)
    });
}

async function addItem(ngan, newItem) {
    let db = await getDB();
    if (!db[ngan]) db[ngan] = [];
    db[ngan].push(newItem);
    await saveDB(db);
}

async function removeItem(ngan, index) {
    let db = await getDB();
    if (db[ngan]) {
        db[ngan].splice(index, 1);
        await saveDB(db);
    }
}

async function clearNgan(ngan) {
    let db = await getDB();
    db[ngan] = [];
    await saveDB(db);
}
const checkSender = document.getElementById('postSent')
checkSender.addEventListener('click',function() {
    const key_input = document.createElement('input');
    key_input.type = 'password';
    key_input.placeholder = "Put back the code...";
    const besure = document.createElement('button');
    besure.textContent = 'Besure';
    document.body.appendChild(key_input);
    document.body.appendChild(besure);
    besure.addEventListener('click', function() {
        if (key_input.value === "AnhQuanPROMAX@1562"){
            async function handleAdd() {
                let list = await getDB();
                let var_postTitle = document.getElementById('postTitle').value;
                let var_postContent = document.getElementById('postContent').value;
                const now = new Date();
                const dateTime = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
                await addItem("Title",var_postTitle);
                await addItem("Content",var_postContent);
                await addItem("Date",dateTime)
                showMessage("green-message","Successfully send your post!")
            }
            handleAdd()
        } else {
            key_input.remove()
            besure.remove()
            showMessage("red-message","Wrong password! Check back or You aren't the owner?");
        }
    });
})
const backBtn = document.createElement('button');
backBtn.id = "backBtn";
backBtn.textContent = "←";
document.body.appendChild(backBtn);
backBtn.addEventListener('click', function() {
    window.location.href = "../index.html"
})