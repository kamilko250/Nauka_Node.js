### Wyświetlenie elementów w liście:

> curl -X GET "**127.0.0.1:8080**/zad9"

W miejsce **127.0.0.1:8080** wpisujemy adres servera do którego się odwołujemy

[tu znajdziesz odpowiedź serwera](getresponse.json)

### Dodanie elementu do list:

> curl -X POST "**127.0.0.1:8080**/zad9" -H "Content-Type: application/json" -d "{\"word\":\"**89**\"}"

W miejsce **89** wstawia się pożądany element, zostanie zwrócona odpowiedź - plik html z nowo dodanym elementem

[tu znajdziesz odpowiedź serwera](addresponse.json)

### Usunięcie elementu z list: 

> curl -X POST "**127.0.0.1:8080**/zad9/delete" -H "Content-Type: application/json" -d "{\"word\":\"**89**\"}"

W miejsce **89** wstawia się pożądany element, zostanie zwrócona odpowiedź - plik html bez podanego elementu

[tu znajdziesz odpowiedź serwera](deleteresponse.json)

### Edycja elementu list: 

> curl -X POST "*127.0.0.1:8080*/zad9/edit" -H "Content-Type: application/json" -d "{\"word_edit\":\"**1234**\",\"word_old\":\"**89**\"}"

 W miejsce **89** wstawia się pożądany element do zmiany, natomiast w miejsce **1234** nowe słowo, zostanie zwrócona odpowiedź - plik html z zmienionym elementem elementu

[tu znajdziesz odpowiedź serwera](editresponse.json)



