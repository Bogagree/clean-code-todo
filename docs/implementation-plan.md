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
Открытых шагов кода нет. Деплой и тело PR ещё не обновлялись.
```

---

## Шаги

Маркер `[done]` = коммит есть в `clean-code`.

```text
main
└── clean-code
    ├── [done] docs: add the clean code implementation plan
    ├── [done] chore: configure eslint and prettier
    ├── [done] fix: close the add-item paragraph before the row
    ├── [done] style: format html, css, and javascript
    ├── [done] refactor: apply eslint automatic fixes
    ├── [done] fix: satisfy the remaining eslint rules
    ├── [done] chore: run lint-staged before commit
    ├── [done] refactor: remove the unused ajax handler
    ├── [done] refactor: listen for a new task once
    ├── [done] refactor: give the task list readable names
    ├── [done] refactor: move a task through one function
    ├── [done] refactor: delete comments that repeat the code
    ├── [done] refactor: name how the starter tasks are bound
    └── [done] docs: record lint counts, checklist, and deploy
```

Содержание каждого коммита, таблица имён и черновик PR — в [specs/clean-code.md](./specs/clean-code.md).

После `chore: run lint-staged before commit` каждый следующий коммит проходит хук. Хук не отключать. Если хук красный — чинить код.

---

## Как пользоваться

Фраза в чате: **следующий шаг**. То же самое: «следующий пункт» и «next step». Это просьба выполнить шаг и показать diff. Коммит и пуш — отдельные просьбы, после просмотра кода. Контракт: [D-008](./decisions.md).

1. Шаг — блок **Next**. Если его нет в `git log` ветки `clean-code` и нет в рабочей копии, выполнить карточку из спеки.
2. После шага изменения остаются незакоммиченными. В ответе — diff.
3. По просьбе закоммитить — один коммит, сообщение дословно из дерева. Пуш — ещё одна отдельная просьба. PR не создавать заново и не мержить.
4. После коммита шага поставить ему `[done]` и записать в **Next** следующий открытый пункт. Статус в спеке и описание PR обновляет только `docs: record lint counts, checklist, and deploy`.

---

## Пока не делать

- Часть 3 (`review-instructions.md`)
- Сборщик, фреймворк, модули в браузере, тесты
- Переименование классов и id
- Правка `.github/workflows/check.yml`
- Merge PR в `main`
- Деплой с ветки `main` — Pages включаем на `clean-code`
