---
name: clean-code-next-step
description: >-
  Runs one Clean Code plan step on branch clean-code and pushes it to the
  open pull request. Use when the user says «следующий шаг», «следующий пункт»,
  or "next step".
---

# Следующий шаг

Фраза пользователя — просьба закоммитить и запушить. Отдельно спрашивать не нужно. Контракт: `docs/decisions.md`, решение D-008.

## Сделать

1. Прочитать `docs/implementation-plan.md`, блок **Next**.
2. Прочитать карточку этого коммита в `docs/specs/clean-code.md` и решения, на которые она ссылается.
3. Выполнить только этот шаг. Сообщение коммита — строка из дерева шагов, дословно.
4. Запушить в `clean-code`. Новый PR не создавать. Открытый PR не мержить. `main` не коммитить. `--no-verify` не использовать.
5. Метки `[done]` и блок **Next** не менять, пока шаг не `docs: record lint counts, checklist, and deploy`.

Если в дереве не осталось открытых пунктов, остановиться и написать, что шагов нет.

В конце ответа назвать коммит и ссылку на PR.
