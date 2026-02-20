import { MsgService } from "../bindings/github.com/rubberduck-ai/rubberduck/services";

// ========== 视图切换 ==========
const views = document.querySelectorAll('.view');
const navBtns = document.querySelectorAll('[data-view]');

function showView(viewId) {
    views.forEach(v => {
        v.classList.toggle('active', v.id === `view-${viewId}`);
    });
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewId = btn.dataset.view;
        if (viewId) showView(viewId);
    });
});

// ========== Chat Agent 逻辑 ==========
const messagesEl = document.getElementById('messages');
const userInputEl = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(role, content) {
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
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage() {
    const text = userInputEl.value.trim();
    if (!text) return;

    userInputEl.value = '';
    userInputEl.style.height = 'auto';

    addMessage('user', text);
    sendBtn.disabled = true;
    sendBtn.classList.add('loading');

    try {
        const reply = await MsgService.SendMessage(text);
        addMessage('assistant', reply);
    } catch (err) {
        console.error(err);
        addMessage('assistant', '抱歉，处理时出现了问题。请稍后再试。');
    } finally {
        sendBtn.disabled = false;
        sendBtn.classList.remove('loading');
    }
}

sendBtn.addEventListener('click', sendMessage);

userInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

userInputEl.addEventListener('input', () => {
    userInputEl.style.height = 'auto';
    userInputEl.style.height = Math.min(userInputEl.scrollHeight, 120) + 'px';
});
