---
name: clean-code-next-step
description: >-
  Runs one Clean Code plan step on branch clean-code and shows the uncommitted
  diff. Use when the user says «следующий шаг», «следующий пункт», or "next
  step". Commit only when the user asks, then push only when the user asks.
---

# Следующий шаг

Фраза пользователя — просьба выполнить шаг и показать diff в коде. Коммит и пуш в неё не входят: их делают только по отдельной просьбе. Контракт: `docs/decisions.md`, решение D-008.

## Сделать

1. Прочитать `docs/implementation-plan.md`, блок **Next**.
2. Прочитать карточку этого коммита в `docs/specs/clean-code.md` и решения, на которые она ссылается.
3. Выполнить только этот шаг. Файлы оставить незакоммиченными.
4. Не коммитить и не пушить. Новый PR не создавать. Открытый PR не мержить. `main` не коммитить. `--no-verify` не использовать.
5. Метки `[done]` и блок **Next** не менять, пока шаг не `docs: record lint counts, checklist, and deploy`.

Если в дереве не осталось открытых пунктов, остановиться и написать, что шагов нет.

В конце ответа показать diff и написать, что коммита нет.

Когда пользователь просит закоммитить, сообщение — строка из дерева шагов, дословно. Пуш по-прежнему отдельно.
