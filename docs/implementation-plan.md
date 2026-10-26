# Clean Code — план реализации

Требования и решения — в SDD-доках, здесь порядок шагов.

## SDD (читать сначала)

| Артефакт         | Путь                                         |
| ---------------- | -------------------------------------------- |
| Как ведём проект | [docs/README.md](./README.md)                |
| Закрытые решения | [decisions.md](./decisions.md)               |
| Спека и статус   | [specs/clean-code.md](./specs/clean-code.md) |
| Конвенции        | [conventions/](./conventions/)               |

Канон курса: [задание](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/clean-code/README.md) (**150**).

База: ветка `clean-code`. Один шаг — один коммит в неё. PR `clean-code` → `main` на cross-check не мержить. [D-001](./decisions.md).

---

## Next

```text
chore: configure eslint and prettier
```

Только инструменты, без `index.html`, `style.css`, `app.js` и без Husky. Перед коммитом повторить прогон ESLint уже в репозитории и сверить таблицу в спеке. Если цифры другие — поправить спеку отдельным `docs:` коммитом, не внутри коммита настройки.

---

## Шаги

Маркер `[done]` = коммит есть в `clean-code`.

```text
main
└── clean-code
    ├── [done] docs: add the clean code implementation plan
    ├── [ ] chore: configure eslint and prettier
    ├── [ ] fix: close the add-item paragraph before the row
    ├── [ ] style: format html, css, and javascript
    ├── [ ] refactor: apply eslint automatic fixes
    ├── [ ] fix: satisfy the remaining eslint rules
    ├── [ ] chore: run lint-staged before commit
    ├── [ ] refactor: remove the unused ajax handler
    ├── [ ] refactor: listen for a new task once
    ├── [ ] refactor: give the task list readable names
    ├── [ ] refactor: move a task through one function
    ├── [ ] refactor: delete comments that repeat the code
    ├── [ ] refactor: name how the starter tasks are bound
    └── [ ] docs: record lint counts, checklist, and deploy
```

Содержание каждого коммита, таблица имён и черновик PR — в [specs/clean-code.md](./specs/clean-code.md).

После `chore: run lint-staged before commit` каждый следующий коммит проходит хук. Хук не отключать. Если хук красный — чинить код.

---

## Как пользоваться

Фраза в чате: **следующий шаг**. То же самое: «следующий пункт» и «next step». Это уже просьба закоммитить и запушить, отдельно писать не нужно. Контракт: [D-008](./decisions.md).

1. Шаг — блок **Next**. Если его нет в `git log` ветки `clean-code`, выполнить карточку из спеки.
2. Один шаг — один коммит. Сообщение дословно из дерева. Проверка — в карточке коммита.
3. Пуш в `clean-code`. PR не создавать заново и не мержить.
4. `[done]` и **Next** сдвигает только последний пункт `docs: record lint counts, checklist, and deploy`. Он же обновляет статус в спеке и описание открытого PR.

---

## Пока не делать

- Часть 3 (`review-instructions.md`)
- Сборщик, фреймворк, модули в браузере, тесты
- Переименование классов и id
- Правка `.github/workflows/check.yml`
- Merge PR в `main`
- Деплой с ветки `main` — Pages включаем на `clean-code`
