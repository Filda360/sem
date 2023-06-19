
# Backend - Rezervace rybářských míst

Aplikace je určena pro Backend webové aplikace sloužící pro účely správy míst na rybářských revírech a rezervace jednotlivých míst rybáři.


## Authors

- [@Filda360](https://www.github.com/Filda360)


## Model
![Model](https://raw.githubusercontent.com/Filda360/sem/master/sem/src/main/java/com/rezervace/sem/model/model.jpg)

## Struktura
| název balíčku | popis |
| :------------ | :---- |
| `controller` | Zde jsou obsaženy controllery pro obsluhu endpointů |
| `dto` | Obsahuje Date Transfer Objects pro přenos dat |
| `model` | Obsahuje datové entity znázorněné na obrázku Modelu |
| `repo` | Zde jsou obsaženy repository pro správu entit |
| `security` | Tento balíček opsahuje moduly pro zabezpečení aplikace (JWT, autentizace, autorizace, řízení přístupu k endpointům) |
| `service` | Osahuje service třídy pro řešení aplikační logiky  |

### Obsažené controllery
`AuthenticationController`, `MistoController`, `RevirController`, `RezervaceController`, `UzivatelController`








## Příklady endpointů
#### dejUzivateleDleId => Vrátí uživatele se zadaným id

```http
  GET /uzivatele/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | id uživatele |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | JWT token pro autorizace |

#### deleteUser => Smaže uživatele se zadaným id
```http
  DELETE /uzivatele/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | id uživatele |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | JWT token pro autorizace |





