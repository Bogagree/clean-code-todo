# Docs — Spec-Driven Development

Clean Code ведётся по **SDD**: требования и решения лежат в репозитории, а не в истории чата.

Задание короткое: одна ветка, одна история коммитов, один Pull Request. Отдельные `feat/*` и фабрика агентов здесь не используются. Ревьюер читает порядок коммитов на PR сдачи.

## Карта

| Файл / папка                                       | Назначение                               |
| -------------------------------------------------- | ---------------------------------------- |
| [decisions.md](./decisions.md)                     | Закрытые решения (`Accepted`)            |
| [specs/clean-code.md](./specs/clean-code.md)       | Поведение, коммиты, статус, текст для PR |
| [implementation-plan.md](./implementation-plan.md) | Порядок шагов и блок `Next`              |
| [conventions/](./conventions/)                     | Git и границы правок                     |
| `.cursor/skills/clean-code-next-step/`             | Фраза «следующий шаг»                    |

## Как работать

1. Фраза «следующий шаг» выполняет блок **Next** в [implementation-plan.md](./implementation-plan.md): один коммит и пуш в открытый PR. Отдельно просить коммит не нужно ([D-008](./decisions.md)).
2. Один шаг плана — один коммит в ветку `clean-code`. Отдельную feature-ветку на шаг не открываем.
3. Решение или уточнение поведения — в `decisions.md` / спеку в том же коммите, который это меняет. Пока идёт серия механических коммитов, правки docs в них не подмешивать: для цифр линтера и статуса есть свой `docs:` коммит до них и точечное обновление после, если цифры разошлись.
4. `main` не двигаем. PR `clean-code` → `main` не мержим.

## Источники курса

Канон баллов — у RS School. Локальные файлы фиксируют наши договорённости.

- [Задание Clean Code](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/clean-code/README.md) — **150**, сумма пунктов 170
- [Модуль Clean Code](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/modules/week-05/clean-code.md)
- [Модуль про ESLint, Prettier и Husky](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/modules/week-09/linters-formatters-husky.md)
- [Git convention](https://rs.school/docs/git-convention)
- [Требования к Pull Request](https://rs.school/docs/mentoring/pull-request-review-process#pull-request-requirements-pr)
