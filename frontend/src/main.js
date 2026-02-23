import {
    SendMsg,
} from "./chat/chat";

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


sendBtn.addEventListener('click', SendMsg);

userInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        SendMsg(userInputEl, messagesEl, sendBtn);
    }
});

userInputEl.addEventListener('input', () => {
    userInputEl.style.height = 'auto';
    userInputEl.style.height = Math.min(userInputEl.scrollHeight, 120) + 'px';
});
