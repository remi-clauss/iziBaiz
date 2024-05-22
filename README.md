# bibliothèque d'animation iziBaiz

## Installation
Pour installer la bibliothèque, ajoutez le répertoire GitHub suivant dans le fichier `package.json` de votre projet en tapant dans la console:

```console
npm install izibaiz
```

Vous devrait retrouvé dans votre `package.json`

```json
"dependencies": {
   "iziBaiz": "izibaiz"
}
```


## Utilisation
Pour instancier la bibliothèque dans un fichier, utilisez l'import suivant :

```javascript
import { IziBaiz, R } from 'izibaiz';
```

L'object IziBaiz permet d'instancier les animation
L'object R permet d'instancier les function connexes

```javascript
new IziBaiz().to(element, {})
new IziBaiz().fromTo(element, {},{})
new IziBaiz().TL(element, {},{},{},{})

R.Lerp(current, target, ease)
R.Clone(JSON)
```

## Fonctionnalités principales
La bibliothèque iziBaiz intègre trois grandes fonctionnalités :

### 1. `.to`
La fonction `.to` permet d'interpoler une valeur vers une valeur donnée.

Exemple d'utilisation :
```javascript
new IziBaiz().to(element, {
    opacity: 1,
    x: 150, // valeur en pixel, 'vh', ou '%'
    duration: 3, // en secondes
    ease: R.Ease4([.72, 0, .11, 1]), // voir les ease disponibles
    delay: delay, // délai souhaité
    onComplete: function() {
        // callback à exécuter à la fin de l'animation
    }
});
```

### 2. `.fromTo`
La fonction `.fromTo` permet d'interpoler une valeur d'une valeur donnée vers une autre valeur.

Exemple d'utilisation :
```javascript
new IziBaiz().fromTo(element, {
    opacity: 0,
    x: 0, // valeur en pixel, 'vh', ou '%'
}, {
    opacity: 1,
    x: 150, // valeur en pixel, 'vh', ou '%'
    duration: 2, // en secondes
    ease: R.Ease.o6, // voir les ease disponibles
    delay: delay, // délai souhaité
    onComplete: function() {
        // callback à exécuter à la fin de l'animation
    }
});
```

### 3. `.TL`
La fonction `.TL` permet de créer une timeline d'interpolation de valeurs.

Exemple d'utilisation :
```javascript
new IziBaiz().TL(element, {
    opacity: 0,
}, {
    opacity: 0.2,
}, {
    opacity: 0.6,
}, {
    opacity: 1,
    x: 150, // valeur en pixel, 'vh', ou '%'
    duration: 2, // en secondes
    ease: R.Ease.o6, // voir les ease disponibles
    delay: delay, // délai souhaité
    onComplete: function() {
        // callback à exécuter à la fin de l'animation
    }
});
```

**Remarque :** Les valeurs `opacity`, `x`, `duration`, `ease`, `delay` et `onComplete` doivent être remplacées par les valeurs souhaitées pour votre animation.


**Les valeurs par default de** `duration`, `ease`, `delay` sont : 

```javascript
...
{
   duration : 1.5,
   ease : R.Ease.o6,
   delay : 0,
}
...
```

## Eases disponibles
Vous pouvez utiliser les ease suivants :

- `R.ease.linear`
- `R.ease.i1`
- `R.ease.o1`
- `R.ease.io1`
- `R.ease.i2`
- `R.ease.o2`
- `R.ease.io2`
- `R.ease.i3`
- `R.ease.o3`
- `R.ease.io3`
- `R.ease.i4`
- `R.ease.o4`
- `R.ease.io4`
- `R.ease.i5`
- `R.ease.o5`
- `R.ease.io5`
- `R.ease.sio5`
- `R.ease.i6`
- `R.ease.o6`
- `R.ease.io6`
- `R.ease.so6`
- `R.ease.sio6`

Vous pouvez également définir un ease personnalisé en utilisant la fonction `R.Ease4([p1, p2, p3, p4])`.

## Propriétés animables
Les propriétés suivantes peuvent être animées :

- `BackgroundColor`
- `color`
- `x`
- `y`
- `rotate`
- `height`
- `width`
- `margin`
- `marginTop`
- `marginRight`
- `marginLeft`
- `marginBottom`
- `padding`
- `paddingTop`
- `paddingRight`
- `paddingBottom`
- `paddingLeft`
- `opacity`
- `autoAlpha`
- `value`
- `volume`
- `borderRadius`

## Unités prises en compte
Les valeurs peuvent être spécifiées en :

- Pixel : `150`
- Pourcentage : `'150%'`
- Viewport Height (`vh`) ou Viewport Width (`vw`) : `'150vh'` ou `'150vw'`
- Hexadécimal : `#504560`

---

Merci d'utiliser iziBaiz pour vos animations ! Si vous avez des questions ou des retours, n'hésitez pas à nous contacter.
![alt text](https://www.radiofrance.fr/s3/cruiser-production/2021/01/2224c77e-2e4d-418e-b2ed-fbdaf9b904b0/870x489_801x410_36636030_405822873271956_6024508582664339456_n_2_1.webp)
