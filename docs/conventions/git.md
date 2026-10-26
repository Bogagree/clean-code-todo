# Git и PR

Источники: [RS Git convention](https://rs.school/docs/git-convention), [PR requirements](https://rs.school/docs/mentoring/pull-request-review-process#pull-request-requirements-pr). Решение по ветке: [D-001](../decisions.md).

## Ветка

```text
main
 └── clean-code
      └── PR clean-code → main    ← cross-check, не мержить
```

- Ветку создать от `main`.
- Коммиты только в `clean-code`.
- Сообщения — из дерева в [implementation-plan.md](../implementation-plan.md), тип и повелительное наклонение по конвенции RS School.

## Что не смешивать

- Коммит настройки не содержит `index.html`, `style.css`, `app.js`.
- Коммит синтаксиса не содержит переформатированного файла целиком.
- Коммит `style: format…` — вывод Prettier, без ручных смысловых правок.
- Коммит автофикса — только `eslint --fix`, без ручного удаления `console` и без удаления функций.
- Husky подключается после зелёного линтера.
- Смысловой `refactor:` не содержит заодно форматирования, которое должен был сделать предыдущий коммит.

`--no-verify` не используем.

## PR сдачи

Один PR: `clean-code` → `main` форка. Шаблон текста — в спеке, раздел «Описание Pull Request».

В описании нет футера про Cursor. Ссылка на спеку и `docs/decisions.md` уместна внизу, после пунктов, которые требует школа.

Перед открытием PR на форке включить Actions («I understand my workflows, go ahead and enable them»). Проверка «ESLint, Prettier, Husky» должна быть зелёной. Если красная — читать текст ошибки на странице проверки, workflow не править.
