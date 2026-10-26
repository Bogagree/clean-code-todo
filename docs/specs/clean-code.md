# Clean Code — spec

Канон: [задание](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/clean-code/README.md) (**150**, сумма пунктов 170).

Статус областей ниже. Закрытый пункт меняем с `нет` на `есть`. Решения: [docs/decisions.md](../decisions.md). Порядок: [implementation-plan.md](../implementation-plan.md).

## Статус

| Область                       | Ожидание                                                                        | Баллы                                    | Статус |
| ----------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | ------ |
| `.gitignore` и `node_modules` | папка не в индексе                                                              | 5                                        | нет    |
| ESLint                        | flat config, recommended, `no-var`, `prefer-const`, `no-console`, скрипт `lint` | 10                                       | нет    |
| Prettier                      | конфиг есть, HTML и CSS участвуют в проверке                                    | 5                                        | нет    |
| Husky и lint-staged           | pre-commit проверяет индекс через lint-staged                                   | 5                                        | нет    |
| CI                            | проверка зелёная, `check.yml` не изменён                                        | 5                                        | нет    |
| Коммит настройки              | без кода приложения                                                             | 5                                        | нет    |
| Коммит форматирования         | только Prettier                                                                 | 10                                       | нет    |
| Коммит автофикса              | только `eslint --fix`                                                           | 5                                        | нет    |
| Смысловые коммиты             | отдельные, сообщения по сути                                                    | 10                                       | нет    |
| Мёртвый код                   | `ajaxRequest` удалён                                                            | 10                                       | нет    |
| Дублирование обработчиков     | у Add один слушатель                                                            | 10                                       | нет    |
| Дублирование логики           | общий перенос задачи; циклы старта не слиты                                     | 10                                       | нет    |
| Имена                         | таблица ниже, без опоры на комментарий                                          | 10                                       | нет    |
| Комментарии                   | пересказ удалён                                                                 | 10                                       | нет    |
| Длинные функции               | сборка строки оставлена целиком, точка входа названа                            | 10                                       | нет    |
| Поведение, пункты 1–8         | добавление, правка, удаление, перенос                                           | 10                                       | нет    |
| Вид и анимация                | пункты 9–10                                                                     | 10                                       | нет    |
| Три объяснения в PR           | проблема, решение, проверка                                                     | 30                                       | нет    |
| Ветка и PR                    | `clean-code` → `main`, не смержен, деплой с этой ветки                          | штраф −50, если схема или деплой сломаны | нет    |

Часть 3 задания (свой AI-ревьюер) — вне работы, [D-007](../decisions.md).

## Поведение

Страница открывается как файл или со статического хостинга. Сборки нет.

Стартовая разметка, её не пересоздаём скриптом:

| Список    | Текст          | Состояние                                               |
| --------- | -------------- | ------------------------------------------------------- |
| Todo      | Pay Bills      | чекбокс снят, кнопка Edit                               |
| Todo      | Go Shopping    | класс `editMode`, в поле уже `Go Shopping`, кнопка Save |
| Completed | See the Doctor | чекбокс включён, кнопка Edit                            |

Контракт после всех коммитов:

- Новый текст из поля попадает одной строкой в Todo. Поле очищается.
- Пустое поле не добавляет строку.
- Строка из пробелов добавляется. `trim` не вводим.
- Edit подставляет текст в поле и меняет кнопку на Save. Save пишет значение поля в подпись, в том числе пустое, и возвращает кнопку Edit.
- Delete убирает эту строку из её списка.
- Включённый чекбокс переносит тот же `li` в Completed и дальше снимает задачу обратно в Todo. `editMode`, если он был, едет с узлом.
- Вид страницы тот же: без зачёркивания выполненных, кнопка удаления поворачивается за 200ms.
- id `new-task`, `incompleteTasks`, `completed-tasks` и класс `editMode` на месте.

## Первый прогон линтера

Пробный прогон 2026-10-26, файл `app.js`, ESLint 10.13. Конфиг как в [D-002](../decisions.md): recommended, глобалы браузера, `no-var`, `prefer-const`, `no-console`, последним `eslint-config-prettier`. Код приложения ещё не менялся.

|                              | Количество |
| ---------------------------- | ---------- |
| Всего проблем                | 43         |
| Из них `--fix` закрывает сам | 29         |
| После `--fix` остаётся       | 14         |

Оставшиеся 14, их закрывает ручной коммит:

| Правило        | Сколько | Что это                                                                                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `no-console`   | 8       | вызовы `console.log`                                                                                                                      |
| `no-var`       | 5       | `taskCompleted`, `taskIncomplete`, `bindTaskEvents` и оба `for (var i` — автофикс не трогает их из-за порядка объявлений и повторного `i` |
| `no-redeclare` | 1       | второй `var i` в той же области                                                                                                           |

`prefer-const` на первом прогоне молчит: пока bindings объявлены через `var`. В том же `--fix`, что убирает 29 `var`, безопасные из них становятся `const`.

Перед коммитом docs прогон повторить уже установленным в репозитории ESLint. Если число другое — обновить эту таблицу в том же коммите. Эти цифры потом дословно нужны в описании PR.

Prettier на старте не разбирает файлы (тоже 2026-10-26, Prettier 3.6):

- `index.html:9` — лишний `</p>`: парсер уже закрыл `p`, когда встретил `div`;
- `style.css:132` — нет точки с запятой после `line-through`.

`app.js` Prettier разбирает, замечание только про формат.

## Часть 1. Коммиты инструментов

### `chore: configure eslint and prettier`

Файлы: `package.json`, `package-lock.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.gitignore`, `.gitattributes`, `.editorconfig`.

Кода приложения нет. Husky нет: скрипта `prepare` ещё нет.

Проверка: `npm run lint` печатает те же классы проблем, что в таблице выше. `npx prettier --check index.html style.css` всё ещё падает на синтаксисе. `git diff` этого коммита не содержит трёх файлов приложения.

### `fix: close the add-item paragraph before the row`

Только синтаксис, [D-004](../decisions.md).

- В `index.html` закрыть `p` сразу после `label`. Блок `.task-row-wrapper` становится соседом, как в живом DOM.
- В `style.css` удалить правило `ul#completed-tasks label` целиком.

Файл целиком не форматировать. Проверка: `prettier --check index.html style.css` больше не пишет `SyntaxError`. Зачёркивания у See the Doctor нет.

### `style: format html, css, and javascript`

`prettier --write` на `index.html`, `style.css`, `app.js`. Новые файлы конфигурации к этому моменту уже отформатированы, в diff они не входят.

Проверка: `prettier --check .` зелёный. Глазами: три стартовые задачи, поле, кнопка Add, поворот иконки удаления. `&quest;` в ссылке остаётся текстом, Prettier его не раскрывает.

### `refactor: apply eslint automatic fixes`

Только `npx eslint app.js --fix`. Руками строки не править.

Ожидание по пробному прогону: около 29 замен `var` на `const`. В файле остаются 5 `var`, 8 `console.log` и повторный `i`.

Проверка: `eslint app.js` показывает 14 проблем из таблицы. Поведение не смотреть по diff, прогнать добавление одной задачи и чекбокс — обработчики те же.

### `fix: satisfy the remaining eslint rules`

Ручные правки, пока `npm run lint` не станет зелёным.

- Удалить восемь `console.log`.
- `var taskCompleted`, `var taskIncomplete`, `var bindTaskEvents` заменить на `const`. Вызовы по-прежнему ниже инициализации или из обработчиков после загрузки, поэтому временная мёртвая зона не срабатывает.
- Оба цикла: `for (let i = …)`. Повторного объявления нет, у каждого цикла своя `i`.
- `ajaxRequest` не удалять. Тело после исчезновения `console.log` пустое, правило `no-empty` его не пропустит. Оставить комментарий, который не описывает задачу пользователя:

```js
const ajaxRequest = function () {
  // Empty until the dead-code commit removes this handler.
};
```

Слушатель `addEventListener("click", ajaxRequest)` и `addButton.onclick = addTask` остаются. Это уже смысл, не линтер.

Проверка: `npm run lint` без замечаний, `prettier --check .` зелёный.

### `chore: run lint-staged before commit`

Пакеты `husky` и `lint-staged`. Скрипт `prepare`: `husky`.

`.husky/pre-commit` вызывает `npx lint-staged` и не содержит голый `prettier --write`.

`lint-staged` в `package.json`:

- `*.js` — `eslint --fix`, затем `prettier --write`;
- `*.{html,css,md,json}` — `prettier --write`.

Проверка: временный `console.log` в `app.js` не даёт сделать коммит. После этого строку убрать отдельным коммитом нельзя, если она не попала в историю: просто откатить рабочую копию. Хук на следующем настоящем коммите снова зелёный.

## Часть 2. Смысл

Каждый пункт — свой коммит после Husky. Имена в коде уже могут быть `const`, комментарии-пересказ ещё на месте до своего коммита.

### `refactor: remove the unused ajax handler`

Удалить функцию `ajaxRequest`, её комментарий-заглушку и `addButton.addEventListener("click", ajaxRequest)`.

`onclick = addTask` и `addEventListener("click", addTask)` пока оба остаются.

Проверка: Add по-прежнему добавляет одну задачу. В консоли нет сообщения AJAX. Пустое поле по-прежнему не добавляет строку.

### `refactor: listen for a new task once`

Удалить `addButton.onclick = addTask`. Остаётся один `addEventListener("click", addTask)`.

Почему это не смена поведения: сейчас функция и так вызывается дважды, второй вызов сразу выходит, потому что первый уже очистил поле.

Проверка: текст `Milk` даёт одну строку в Todo. Повторное нажатие Add на пустом поле ничего не добавляет. Пробелы в поле по-прежнему дают строку.

### `refactor: give the task list readable names`

Переименовать привязки. Строки `editMode`, `Edit`, `Save`, id и селекторы `.edit` / `.delete` / `input[type=checkbox]` не менять.

Кнопку Add искать как `document.querySelector(".task-row-wrapper button")`. Сейчас это тот же первый `button` документа, только место читается из разметки.

| Было                   | Стало                |
| ---------------------- | -------------------- |
| `taskInput`            | `newTaskInput`       |
| `addButton`            | `addTaskButton`      |
| `incompleteTaskHolder` | `todoList`           |
| `completedTasksHolder` | `completedList`      |
| `createNewTaskElement` | `createTaskElement`  |
| `taskString`           | `taskTitle`          |
| `listItem`             | `taskElement`        |
| `checkBox`             | `checkbox`           |
| `editInput`            | `titleInput`         |
| `editBtn`              | `editButton`         |
| `deleteButtonImg`      | `deleteIcon`         |
| `containsClass`        | `isEditing`          |
| `ul`                   | `taskList`           |
| `checkBoxEventHandler` | `onCheckboxChange`   |
| `taskCompleted`        | `markTaskComplete`   |
| `taskIncomplete`       | `markTaskIncomplete` |
| `addTask`              | `addTask`            |
| `editTask`             | `editTask`           |
| `deleteTask`           | `deleteTask`         |
| `bindTaskEvents`       | `bindTaskEvents`     |

Проверка: Go Shopping по-прежнему открыт с Save. Pay Bills редактируется. Селектор кнопки Add находит одну кнопку, новая задача одна.

### `refactor: move a task through one function`

[D-006](../decisions.md). Вынести перенос:

```js
function moveTask(taskElement, targetList, onCheckboxChange) {
  targetList.appendChild(taskElement);
  bindTaskEvents(taskElement, onCheckboxChange);
}
```

`markTaskComplete` зовёт `moveTask(this.parentNode, completedList, markTaskIncomplete)`. `markTaskIncomplete` зовёт `moveTask(this.parentNode, todoList, markTaskComplete)`.

Проверка: Pay Bills уходит в Completed и возвращается в Todo одним узлом. Если отметить чекбокс в режиме Save, `editMode` остаётся на этой строке. Delete в обоих списках удаляет строку.

### `refactor: delete comments that repeat the code`

Удалить комментарии, которые описывают, что и так написано строкой ниже, включая шапку файла про DOM и «Problem / Solution».

Новых комментариев не добавлять: причина пустой строки, одного слушателя и общего переноса читается из имён и [D-006](../decisions.md).

Проверка: `git show` этого коммита не меняет исполняемые строки. `npm run lint` зелёный.

### `refactor: name how the starter tasks are bound`

Два цикла перенести в функцию `bindStarterTasks` и вызвать её в конце файла. Циклы внутри не объединять: у Todo и Completed разные обработчики чекбокса, общее уже в `bindTaskEvents`.

`createTaskElement` не дробить.

Проверка: три стартовые задачи реагируют на Edit, Delete и чекбокс без повторной загрузки логики. Новая задача тоже.

## Описание Pull Request

Собрать в последнем шаге. Кроме пунктов школы (ссылка на задание, скриншот, деплой, срок, самопроверка) в теле есть четыре блока задания.

Деплой: GitHub Pages, источник — ветка `clean-code`, каталог `/`. Ожидаемый адрес: `https://bogagree.github.io/clean-code-todo/`.

### Результат первого линтера

Подставить подтверждённую таблицу из раздела «Первый прогон». Кратко: 43 проблемы, 29 закрыл `--fix` (`var` → `const`), руками сняты `console`, пять оставшихся `var` и повторный индекс цикла. `ajaxRequest` в том коммите ещё жива, потому что удаление функции — отдельное смысловое изменение; пустое тело удержано комментарием из-за `no-empty`.

### Чек-лист

Отметить после прогона на деплое, не на `file://`, если Pages уже открыт. Иначе сначала локально, и в PR так и написать, пока деплой не поднят.

- [ ] Новая задача добавляется в список «Todo»
- [ ] Задача в списке «Todo» редактируется
- [ ] Задача удаляется из списка «Todo»
- [ ] Чекбокс переносит задачу в «Completed»
- [ ] Задача в списке «Completed» редактируется
- [ ] Задача удаляется из списка «Completed»
- [ ] Снятие чекбокса возвращает задачу в «Todo»
- [ ] Пустая задача не добавляется
- [ ] Внешний вид приложения не изменился
- [ ] Анимация кнопки удаления работает

### Три объяснения

**1. Два слушателя на Add.** Кнопка вызывала `addTask` и через `onclick`, и через `addEventListener`. Второй вызов не создавал вторую строку только потому, что первый очищал поле. Оставили один `addEventListener`. Проверка: `Milk` появляется один раз, пустой Add список не меняет, строка из пробелов по-прежнему добавляется.

**2. Два переноса задачи.** `markTaskComplete` и `markTaskIncomplete` одинаково переносили тот же `li` и заново вешали события. Отличались список и следующий обработчик чекбокса. Общий шаг собран в `moveTask`, две функции направления оставлены. Проверка: Pay Bills уходит в Completed и возвращается; чекбокс в режиме Save уносит `editMode` вместе со строкой; Delete удаляет её и из Todo, и из Completed.

**3. Имена без комментария.** `incompleteTaskHolder` не читается как список Todo, пара называется во множественном числе иначе, `containsClass` не говорит про режим правки, кнопка Add искалась как первая кнопка страницы. Привязки переименованы по таблице спеки, кнопка берётся из `.task-row-wrapper`. Класс `editMode` и id не менялись. Проверка: Go Shopping по-прежнему открыт на Save, три стартовые строки на своих местах, Add / Edit / Delete / чекбокс совпадают с чек-листом.

Рядом в истории, но не вместо этих трёх абзацев: удаление `ajaxRequest` и снятие комментариев-пересказа. Сборку строки задачи не дробили — [D-006](../decisions.md).

## Сдача

1. Actions на форке включены.
2. Pages смотрит на ветку `clean-code`.
3. PR в `main` открыт и не смержен, проверка CI зелёная.
4. В теле PR — деплой, цифры линтера, отмеченный чек-лист, три объяснения.
5. Статус в этой спеке переведён на `есть` по закрытым строкам.
