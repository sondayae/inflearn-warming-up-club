
function init() {
    const categoryItems = document.querySelectorAll('.category');

    for(let category of categoryItems) {
        category.addEventListener('click', (e) => {
            const type = e.currentTarget.textContent;
            const menuList = getMenuList(type);
            clearMenuArea();
            menuList.forEach((menu) => {
                renderMenu(menu);
            })
        });
    }
    
    const allMenuList = getMenuList('All');
    allMenuList.forEach((menu) => {
        renderMenu(menu);
    });
};

function clearMenuArea() {
    const menuArea = document.getElementById('menu_area');
    menuArea.innerHTML = '';
}
function renderMenu(menu) {
    const menuArea = document.getElementById('menu_area');
    const cloneItem = document.querySelector('div[menuSample]').cloneNode(true);
    cloneItem.removeAttribute('menuSample');
    cloneItem.classList.remove('hide');
    cloneItem.querySelector('[menuTitle]').textContent = menu.title;
    cloneItem.querySelector('[menuDesc]').textContent = menu.desc;
    menuArea.append(cloneItem);
};

function getMenuList(type) {
    const menuList = [];
    for (let i=1; i<=10; i++) {
        const menu = {
            category: type,
            title: `${type} ${i}`,
            desc: `This is ${type} ${i}`,
        }
        menuList.push(menu);
    }
    return menuList;
    
}