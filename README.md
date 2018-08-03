# Задание:
Создать json файл со списокм авторов, у каждого автора есть массив books в котором список книг, написанных ним

Сделать страницы: 
1. Главная (список всех книг, с ссылками на книги)
2. Внутрення страница книги
3. Страница автора (на странице отобразить все книги, написанные этим автором)

Дизайн: Произвольный 
Что использовать: Bootstrap4, vue.js, vue-router

Книг должно быть больше 10, на главной должен быть пейджинг, выводить по 5 на страницу 
Добавить сортировку на главную(можно в виде обычного селекта с четырьмя опшенами) по названию книги (А-Я, Я-А) + по имени-фамилии автора (А-Я, Я-А) сортировку и пейджинг сохранять в адресной строке, чтобы можно было кинуть ссылку кому-то.

## books

> A Vue.js project

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
