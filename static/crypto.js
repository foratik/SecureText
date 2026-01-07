async function getKeyFromPassword(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']
    );
    return await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptText() {
    const enc = new TextEncoder();
    const text = document.getElementById('input').value || '';
    const password = document.getElementById('password').value || '';
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await getKeyFromPassword(password, salt);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        enc.encode(text)
    );
    const data = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
    document.getElementById('output').value = btoa(String.fromCharCode(...data));
}

async function decryptText() {
    const dec = new TextDecoder();
    const b64 = document.getElementById('input').value || '';
    const password = document.getElementById('password').value || '';
    try {
        const data = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        const salt = data.slice(0, 16);
        const iv = data.slice(16, 28);
        const ciphertext = data.slice(28);
        const key = await getKeyFromPassword(password, salt);
        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            ciphertext
        );
        document.getElementById('output').value = dec.decode(decrypted);
    } catch (e) {
        alert('Decryption failed. Incorrect password or corrupted text.');
    }
}

function copyToClipboard(id, msgId) {
    const el = document.getElementById(id);
    const text = el.value || el.textContent || '';
    const msg = document.getElementById(msgId || 'copy-msg');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            if (msg) { msg.classList.add('show'); setTimeout(()=>msg.classList.remove('show'), 1400); }
        }).catch(() => fallbackCopy(el, msg));
    } else {
        fallbackCopy(el, msg);
    }
}

function fallbackCopy(el, msg) {
    try {
        if (el.select) {
            el.select();
            el.setSelectionRange(0, 99999);
        }
        document.execCommand('copy');
        if (msg) { msg.classList.add('show'); setTimeout(()=>msg.classList.remove('show'), 1400); }
    } catch (e) {
        alert('Copy failed.');
    }
}

// Copy output when user clicks the result textarea (convenient on mobile/desktop)
document.addEventListener('DOMContentLoaded', ()=>{
    const out = document.getElementById('output');
    if(out){
        out.addEventListener('click', ()=> copyToClipboard('output','copy-msg'));
    }
});
