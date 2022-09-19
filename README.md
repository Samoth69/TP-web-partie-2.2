# Partie 2.1 - HTML

Thomas VIOLENT  
Tarik SAGLAMER

## Formulaires

1. Qu’est-ce qui change côté en-têtes HTTP ?

En POST ces 3 balises apparaissent :

```http
Content-Type: application/x-www-form-urlencoded
Content-Length: 49
Origin: http://192.168.162.128
```

2. Où apparaissent les paramètres dans la requête POST ?

Les paramètres après apparaissent les en-têtes ci-dessous :

```http
POST /index2.html HTTP/1.1
Host: 192.168.162.128
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 49
Origin: http://192.168.162.128
DNT: 1
Connection: keep-alive
Referer: http://192.168.162.128/index2.html
Upgrade-Insecure-Requests: 1

nom=Patrick+l%27%C3%A9toile+de+mer&bouton=Envoyer
```
