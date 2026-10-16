document.addEventListener("DOMContentLoaded", function() {
    function showMessage(text) {
        const message = document.createElement('p');
        message.textContent = text;
        message.className = 'message';
        document.body.appendChild(message);
        setTimeout(function () {
            message.remove();
        }, 3000);
    }

    const checkBtn = document.getElementById('submitPasswordBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            const passwordInputed = document.getElementById('passwordInput').value;
            if (passwordInputed === "AnhQuanPROMAX@1562"){
                if (document.getElementById('bcBtn')) return;
                const bcBtn = document.createElement('button');
                bcBtn.innerText = "I am human.";
                bcBtn.id = "bcBtn";
                document.body.appendChild(bcBtn);
                bcBtn.addEventListener('mouseenter', function() {
                    bcBtn.innerText = "Click to Verify.";
                });
                bcBtn.addEventListener('mouseleave', function() {
                    bcBtn.innerText = "I am human.";
                });
                bcBtn.addEventListener('click', () => {
                    window.location.href = "newpost/index.html";
                });
            } else {
                showMessage("Wrong Password, please try again.");
            }
        });
    }

    const backBtn = document.createElement('button');
    backBtn.id = "backBtn";
    backBtn.textContent = "←";
    document.body.appendChild(backBtn);
    backBtn.addEventListener('click', function() {
        window.location.href = "../index.html";
    });
});