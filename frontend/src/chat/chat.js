import { MsgService } from "../../bindings/github.com/rubberduck-ai/rubberduck/services";


function addMessage(msgEl, role, content) {
    const msg = document.createElement('div');
    msg.className = `message ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const p = document.createElement('p');
    p.textContent = content;
    bubble.appendChild(p);
    if (role === 'assistant') {
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = '🦆';
        msg.appendChild(avatar);
    }
    msg.appendChild(bubble);
    msgEl.appendChild(msg);
    msgEl.scrollTop = msgEl.scrollHeight;
}

async function SendMsg(userInputEl, msgEl, sendBtn) {
    const text = userInputEl.value.trim();
    if (!text) return;

    userInputEl.value = '';
    userInputEl.style.height = 'auto';

    addMessage(msgEl, 'user', text);
    sendBtn.disabled = true;
    sendBtn.classList.add('loading');

    try {
        const reply = await MsgService.SendMessage(text);
        addMessage(msgEl, 'assistant', reply);
    } catch (err) {
        console.error(err);
        addMessage(msgEl, 'assistant', '抱歉，处理时出现了问题。请稍后再试。');
    } finally {
        sendBtn.disabled = false;
        sendBtn.classList.remove('loading');
    }
}

export {
    SendMsg,
}