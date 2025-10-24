let data = {};
let usedTabs = new Set();

function createDefaultData() {
    return {
        "0": {
            "actions": ["Атака", "Влияние", "Затаивание", "Изучение", "Использование", "Магия", "Отход", "Подготовка", "Поиск", "Помощь", "Рывок", "Уклонение"],
            "bonus_actions": ["Выпить зелье"],
            "reactions": ["Провоцированная атака"],
            "spare_actions": []
        }
    };
}
function loadData() {
    const stored = localStorage.getItem('actionsData');
    if (stored) {
        data = JSON.parse(stored);
    } else {
        data = createDefaultData();
        localStorage.setItem('actionsData', JSON.stringify(data));
    }
    populateSelect();
}

function populateSelect() {
    const select = $('#idSelect');
    select.empty();
    Object.keys(data).forEach(id => select.append(`<option value="${id}">${id}</option>`));
    select.trigger('change');
}

function saveData() {
    localStorage.setItem('actionsData', JSON.stringify(data));
}

function renderTab(tabName, items) {
    const container = $(`#${tabName}`);
    container.empty();

    const list = $('<ul></ul>');
    if (!items || !items.length) items = [];
    items.forEach((a, i) => {
        const li = $(`
      <li>
        <input type="text" value="${a}" data-index="${i}" class="editable-item">
        <button class="delete-item">✕</button>
      </li>
    `);
        list.append(li);
    });
    container.append(list);

    const addBtn = $('<button>Добавить строку</button>');
    addBtn.on('click', () => {
        items.push("Новое действие");
        updateCurrentTabData(tabName, items);
    });

    const spendBtn = $('<button class="spend">Потратить действие</button>');
    spendBtn.on('click', () => blockTab(tabName, spendBtn));

    container.append(addBtn);
    container.append(spendBtn);
}

function updateCurrentTabData(tabName, items) {
    const id = $('#idSelect').val();
    data[id][tabName] = items;
    saveData();
    renderTab(tabName, items);
}

function blockTab(tabName, btn) {
    usedTabs.add(tabName);
    btn.addClass('blocked');
    $(`#${tabName}`).addClass('dimmed');
}

function resetTabs() {
    usedTabs.clear();
    $('.tab-content').removeClass('dimmed');
    $('button').removeClass('blocked');
}

function attachEditHandlers() {
    $(document).on('input', '.editable-item', function() {
        const tabName = $('.tab-content.active').attr('id');
        const id = $('#idSelect').val();
        const index = $(this).data('index');
        data[id][tabName][index] = $(this).val();
        saveData();
    });

    $(document).on('click', '.delete-item', function() {
        const tabName = $('.tab-content.active').attr('id');
        const id = $('#idSelect').val();
        const index = $(this).siblings('input').data('index');
        data[id][tabName].splice(index, 1);
        saveData();
        renderTab(tabName, data[id][tabName]);
    });
}

function addNewId() {
    const newId = prompt("Введите новый ID:");
    if (!newId || data[newId]) return;
    data[newId] = { actions: [], bonus_actions: [], reactions: [] };
    saveData();
    populateSelect();
    $('#idSelect').val(newId).trigger('change');
}

function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            data = jsonData;
            saveData();
            populateSelect();
        } catch {
            alert('Ошибка: некорректный JSON файл.');
        }
    };
    reader.readAsText(file);
}

function handleClipboardImport() {
    navigator.clipboard.readText().then(text => {
        try {
            const jsonData = JSON.parse(text);
            data = jsonData;
            saveData();
            populateSelect();
        } catch {
            alert('Ошибка: содержимое буфера не является JSON.');
        }
    });
}

$(document).on('click', '.tab-button', function() {
    const tab = $(this).data('tab');
    $('.tab-button').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $(`#${tab}`).addClass('active');
});

$('#idSelect').on('change', function() {
    const id = $(this).val();
    const entry = data[id];
    renderTab('actions', entry.actions);
    renderTab('bonus_actions', entry.bonus_actions);
    renderTab('reactions', entry.reactions);
    renderTab('spare_actions', entry.spare_actions);
    $('.tab-button').removeClass('active').first().addClass('active');
    $('.tab-content').removeClass('active');
    $('#actions').addClass('active');
});

$('#resetTabs').on('click', resetTabs);
$('#addIdBtn').on('click', addNewId);
$('#uploadFileBtn').on('click', () => $('#fileInput').click());
$('#fileInput').on('change', function() {
    if (this.files.length) handleFileUpload(this.files[0]);
});
$('#uploadClipboardBtn').on('click', handleClipboardImport);

$(document).ready(() => {
    loadData();
    attachEditHandlers();
});