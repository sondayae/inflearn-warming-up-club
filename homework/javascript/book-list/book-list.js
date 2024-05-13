function init() {
    const form = document.querySelector('#addBookForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (formData.get('name') && formData.get('author')) {
            const book = new Book({name: formData.get('name'), author: formData.get('author')});
            book.add();

            form.querySelectorAll('input').forEach((input) => {
                input.value = '';
            });
        }
    });
}

class Book {
    constructor(info) {
        this.name = info.name;
        this.author = info.author;
    }

    add() {
        const list = document.querySelector('#list');
        const id = 'id_' + new Date().getTime();
        for (let i in this) {
            const span = document.createElement('span');
            span.textContent = this[i];
            span.id = id;
            list.appendChild(span);
        }

        const addButton = () => {
            const button = document.createElement('button');
            button.textContent = '삭제';
            button.id = id;
            button.addEventListener('click', (event) => {
                this.delete(event.currentTarget.id);
            })
            list.appendChild(button);
        }
        addButton();
    }

    delete(id) {
        const elements = document.querySelectorAll('#' + id);
        elements.forEach(element => {
            element.remove();
        });
    }
}